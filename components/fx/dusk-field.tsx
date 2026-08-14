"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NIGHT = 0x04070d;
const LIGHT_CYCLE_MS = 40000;

function buildSkyTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const gradient = ctx.createLinearGradient(0, 0, 0, 256);
  gradient.addColorStop(0, "#4a6d8a");
  gradient.addColorStop(0.34, "#2a4458");
  gradient.addColorStop(0.55, "#c4a07a");
  gradient.addColorStop(0.62, "#1a140e");
  gradient.addColorStop(1, "#04070d");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 2, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

function buildTerrain() {
  const geometry = new THREE.PlaneGeometry(120, 80, 128, 80);
  geometry.rotateX(-Math.PI / 2);

  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    const hills =
      Math.sin(x * 0.09 + z * 0.03) * Math.cos(z * 0.055) * 2.4 +
      Math.sin(x * 0.22 - z * 0.14) * 0.85 +
      Math.sin(x * 0.51 + z * 0.33) * 0.28;
    const ridge = Math.pow(Math.abs(Math.sin(x * 0.038 + z * 0.018)), 1.6) * 1.6;
    positions.setY(i, hills + ridge);
  }

  geometry.computeVertexNormals();
  return geometry;
}

function buildGrainMaterial(amount: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uAmount: { value: amount },
      uSeed: { value: 0 },
    },
    vertexShader: `
      void main() {
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uAmount;
      uniform float uSeed;
      void main() {
        vec2 uv = gl_FragCoord.xy + uSeed;
        float n = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        gl_FragColor = vec4(vec3(n), uAmount);
      }
    `,
  });
}

/**
 * Fixed dusk landscape behind the page: a quiet topographic relief,
 * fog, and a 40s light drift. Not interactive.
 */
export function DuskField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: false,
      powerPreference: "low-power",
    });
    renderer.setClearColor(NIGHT, 1);
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.6),
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const sky = buildSkyTexture();
    if (sky) scene.background = sky;
    scene.fog = new THREE.Fog(0x071019, 14, 52);

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 90);
    camera.position.set(-2.4, 1.85, 11);
    camera.lookAt(2.5, 0.7, -18);

    const hemi = new THREE.HemisphereLight(0x8eb4d0, 0x2a1c12, 0.85);
    scene.add(hemi);

    const sun = new THREE.DirectionalLight(0xf0c49a, 1.35);
    sun.position.set(10, 5.5, 6);
    scene.add(sun);

    const fill = new THREE.DirectionalLight(0x4d6f8c, 0.28);
    fill.position.set(-8, 2.5, -4);
    scene.add(fill);

    const terrain = new THREE.Mesh(
      buildTerrain(),
      new THREE.MeshStandardMaterial({
        color: 0x1c2730,
        roughness: 0.94,
        metalness: 0.04,
      }),
    );
    terrain.position.set(0, -1.15, -10);
    scene.add(terrain);

    const grainScene = new THREE.Scene();
    const grainCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const grainMaterial = buildGrainMaterial(reduceMotion ? 0.03 : 0.045);
    const grainMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), grainMaterial);
    grainScene.add(grainMesh);

    const setSize = () => {
      const width = host.clientWidth || window.innerWidth;
      const height = host.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    setSize();

    let frame = 0;
    let running = 0;
    let grainTick = 0;
    const started = performance.now();

    const paint = (now: number) => {
      if (!reduceMotion) {
        const t = ((now - started) % LIGHT_CYCLE_MS) / LIGHT_CYCLE_MS;
        const a = t * Math.PI * 2;
        sun.position.set(
          Math.sin(a) * 14,
          4.8 + Math.cos(a * 0.5) * 1.6,
          4 + Math.cos(a) * 8,
        );
        hemi.intensity = 0.78 + Math.sin(a) * 0.08;
      }

      grainTick += 1;
      if (grainTick % 6 === 0) {
        grainMaterial.uniforms.uSeed.value = (now * 0.001) % 1000;
      }

      renderer.autoClear = true;
      renderer.render(scene, camera);
      renderer.autoClear = false;
      renderer.render(grainScene, grainCamera);
      renderer.autoClear = true;
    };

    const loop = (now: number) => {
      paint(now);
      frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        running = 0;
        return;
      }
      if (!reduceMotion && running === 0) {
        running = 1;
        frame = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("resize", setSize);
    document.addEventListener("visibilitychange", onVisibility);

    paint(performance.now());
    if (!reduceMotion) {
      running = 1;
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", setSize);
      document.removeEventListener("visibilitychange", onVisibility);
      sky?.dispose();
      terrain.geometry.dispose();
      (terrain.material as THREE.Material).dispose();
      grainMesh.geometry.dispose();
      grainMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    />
  );
}
