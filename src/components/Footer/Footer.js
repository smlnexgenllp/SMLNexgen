"use client";

import styles from "./Footer.module.css";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createNoise4D } from "simplex-noise";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera;
    let width, height, cx, cy, wWidth, wHeight;
    const TMath = THREE.MathUtils;

    let plane;
    const simplex = createNoise4D();

    const mouse = new THREE.Vector2();
    const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const mousePosition = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();

    let light1, light2, light3, light4; // Declare lights here

    const noiseInput = document.getElementById("noiseInput");
    const heightInput = document.getElementById("heightInput");

    const conf = {
      fov: 75,
      cameraZ: 75,
      xyCoef: 50,
      zCoef: 10,
      lightIntensity: 0.9,
      ambientColor: 0x000000,
      light1Color: 0x0e09dc,
      light2Color: 0x1cd1e1,
      light3Color: 0x18c02c,
      light4Color: 0xee3bcf,
    };

    function init() {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        antialias: true,
        alpha: true,
      });
      camera = new THREE.PerspectiveCamera(conf.fov);
      camera.position.z = conf.cameraZ;

      updateSize();
      window.addEventListener("resize", updateSize, false);

      initScene();
      initGui();
      animate();
    }

    function initGui() {
      noiseInput.value = 101 - conf.xyCoef;
      heightInput.value = (conf.zCoef * 100) / 25;

      noiseInput.addEventListener("input", (e) => {
        conf.xyCoef = 101 - noiseInput.value;
      });
      heightInput.addEventListener("input", (e) => {
        conf.zCoef = (heightInput.value * 25) / 100;
      });

      document.getElementById("trigger").addEventListener("click", (e) => {
        updateLightsColors();
      });
    }

    function initScene() {
      scene = new THREE.Scene();
      initLights();

      let mat = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });
      let geo = new THREE.PlaneGeometry(
        wWidth,
        wHeight,
        wWidth / 2,
        wHeight / 2
      );
      plane = new THREE.Mesh(geo, mat);
      scene.add(plane);

      plane.rotation.x = -Math.PI / 2 - 0.2;
      plane.position.y = -25;
      camera.position.z = 60;
    }

    function initLights() {
      const r = 30;
      const y = 10;
      const lightDistance = 500;

      light1 = new THREE.PointLight(
        conf.light1Color,
        conf.lightIntensity,
        lightDistance
      );
      light1.position.set(0, y, r);
      scene.add(light1);
      light2 = new THREE.PointLight(
        conf.light2Color,
        conf.lightIntensity,
        lightDistance
      );
      light2.position.set(0, -y, -r);
      scene.add(light2);
      light3 = new THREE.PointLight(
        conf.light3Color,
        conf.lightIntensity,
        lightDistance
      );
      light3.position.set(r, y, 0);
      scene.add(light3);
      light4 = new THREE.PointLight(
        conf.light4Color,
        conf.lightIntensity,
        lightDistance
      );
      light4.position.set(-r, y, 0);
      scene.add(light4);
    }

    function animate() {
      requestAnimationFrame(animate);

      animatePlane();
      animateLights();

      renderer.render(scene, camera);
    }

    function animatePlane() {
      const gArray = plane.geometry.attributes.position.array;
      const time = Date.now() * 0.0002;
      for (let i = 0; i < gArray.length; i += 3) {
        gArray[i + 2] =
          simplex(
            gArray[i] / conf.xyCoef,
            gArray[i + 1] / conf.xyCoef,
            time,
            mouse.x + mouse.y
          ) * conf.zCoef;
      }
      plane.geometry.attributes.position.needsUpdate = true;
    }

    function animateLights() {
      const time = Date.now() * 0.001;
      const d = 50;
      light1.position.x = Math.sin(time * 0.1) * d;
      light1.position.z = Math.cos(time * 0.2) * d;
      light2.position.x = Math.cos(time * 0.3) * d;
      light2.position.z = Math.sin(time * 0.4) * d;
      light3.position.x = Math.sin(time * 0.5) * d;
      light3.position.z = Math.sin(time * 0.6) * d;
      light4.position.x = Math.sin(time * 0.7) * d;
      light4.position.z = Math.cos(time * 0.8) * d;
    }

    function updateLightsColors() {
      conf.light1Color = THREE.MathUtils.randInt(0x000000, 0xffffff);
      conf.light2Color = THREE.MathUtils.randInt(0x000000, 0xffffff);
      conf.light3Color = THREE.MathUtils.randInt(0x000000, 0xffffff);
      conf.light4Color = THREE.MathUtils.randInt(0x000000, 0xffffff);

      light1.color.setHex(conf.light1Color);
      light2.color.setHex(conf.light2Color);
      light3.color.setHex(conf.light3Color);
      light4.color.setHex(conf.light4Color);
    }

    function updateSize() {
      width = window.innerWidth;
      cx = width / 2;
      height = window.innerHeight;
      cy = height / 2;
      if (renderer && camera) {
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const wsize = getRendererSize();
        wWidth = wsize[0];
        wHeight = wsize[1];
      }
    }

    function getRendererSize() {
      const cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
      const vFOV = (cam.fov * Math.PI) / 180;
      const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
      const width = height * cam.aspect;
      return [width, height];
    }

    const handleMouseMove = (e) => {
      const v = new THREE.Vector3();
      camera.getWorldDirection(v);
      v.normalize();
      mousePlane.normal = v;
      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(mousePlane, mousePosition);
    };

    init();

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", updateSize);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Smooth Scroll Function for Contact Button
  // const handleScrollToContact = (e) => {
  //   e.preventDefault();
  //   const contactSection = document.getElementById("contact");
  //   if (contactSection) {
  //     contactSection.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  return (
    <div className={styles.footerContainer}>
      {/* Controls */}
      <div className={styles.controls}>
        <form className={styles.controlForm}>
          <div className={styles.controlGroup}>
            <label htmlFor="noiseInput">Noise Coef</label>
            <input type="range" id="noiseInput" className={styles.slider} />
          </div>
          <div className={styles.controlGroup}>
            <label htmlFor="heightInput">Height Coef</label>
            <input type="range" id="heightInput" className={styles.slider} />
          </div>
          <a href="#" id="trigger" className={styles.colorButton}>
            Random Colors
          </a>
        </form>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className={styles.canvas}></canvas>

      {/* Footer Content */}
      <div className={styles.footerContent}>
        {/* Address Section (Left) */}
        <motion.div
          className={styles.addressSection}
          whileHover={{ scale: 1.05, opacity: 1 }}
          initial={{ opacity: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className={styles.sectionTitle}>Visit Us</h3>
          <Link
            href="https://maps.app.goo.gl/FriRZh1HgECXED12A"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className={styles.address}>
              📍 2nd floor, JPS Tower, Thally Rd
              <br />
              Hosur - 635109, TamilNadu
              <br />
              India.
            </p>
          </Link>
          <p className={styles.contactInfo}>
            <Link href="tel:+919487084117">📞 (+91) 94870-84117</Link>
            <br />
            <Link href="mailto:admin@smlnexgenllp.com">
              ✉️ admin@smlnexgenllp.com
            </Link>
          </p>
        </motion.div>

        {/* Copyright Section (Center) */}
        <div className={styles.copyright}>
          © {new Date().getFullYear()} SMLNEXGEN LLP. All rights reserved.
        </div>

        {/* CTA Section (Right) */}
        <div className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>Ready to Collaborate?</h3>
          <button className={styles.ctaButton} >
          <Link href="/Home/Contact">
            Get Started Today
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
