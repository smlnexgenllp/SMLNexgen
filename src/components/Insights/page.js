"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./Insights.module.css";

const CardCarousel = () => {
  const containerRef = useRef(null);
  const controllerRef = useRef(null);
  const [isReady, setIsReady] = useState(false); // Tracks when layout is done

  useLayoutEffect(() => {
    const cardsContainer = containerRef.current;
    const cardsController = controllerRef.current;

    class DraggingEvent {
      constructor(target = undefined) {
        this.target = target;
      }

      event(callback) {
        let handler;

        this.target.addEventListener("mousedown", (e) => {
          e.preventDefault();
          handler = callback(e);
          window.addEventListener("mousemove", handler);
          document.addEventListener("mouseleave", clearDraggingEvent);
          window.addEventListener("mouseup", clearDraggingEvent);

          function clearDraggingEvent() {
            window.removeEventListener("mousemove", handler);
            window.removeEventListener("mouseup", clearDraggingEvent);
            document.removeEventListener("mouseleave", clearDraggingEvent);
            handler(null);
          }
        });

        this.target.addEventListener("touchstart", (e) => {
          handler = callback(e);
          window.addEventListener("touchmove", handler);
          window.addEventListener("touchend", clearDraggingEvent);
          document.body.addEventListener("mouseleave", clearDraggingEvent);

          function clearDraggingEvent() {
            window.removeEventListener("touchmove", handler);
            window.removeEventListener("touchend", clearDraggingEvent);
            handler(null);
          }
        });
      }

      getDistance(callback) {
        function distanceInit(e1) {
          let startingX, startingY;
          if ("touches" in e1) {
            startingX = e1.touches[0].clientX;
            startingY = e1.touches[0].clientY;
          } else {
            startingX = e1.clientX;
            startingY = e1.clientY;
          }
          return function (e2) {
            if (e2 === null) {
              return callback(null);
            } else {
              if ("touches" in e2) {
                return callback({
                  x: e2.touches[0].clientX - startingX,
                  y: e2.touches[0].clientY - startingY,
                });
              } else {
                return callback({
                  x: e2.clientX - startingX,
                  y: e2.clientY - startingY,
                });
              }
            }
          };
        }
        this.event(distanceInit);
      }
    }

    class CardCarouselClass extends DraggingEvent {
      constructor(container, controller = undefined) {
        super(container);
        this.container = container;
        this.controllerElement = controller;

        // Our three cards
        this.cards = container.querySelectorAll(`.${styles.card}`);

        // For 3 cards: indexes -1, 0, 1
        this.centerIndex = (this.cards.length - 1) / 2;

        // Card width in percentage (relative to container width)
        this.cardWidth =
          (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;

        // For storing card positions
        this.xScale = {};

        // For smoothing the drag
        this.currentXDist = 0;

        window.addEventListener("resize", this.updateCardWidth.bind(this));

        if (this.controllerElement) {
          this.controllerElement.addEventListener(
            "keydown",
            this.controller.bind(this)
          );
        }

        // Initialize
        this.build();

        // Listen for drag distance
        super.getDistance(this.moveCards.bind(this));
      }

      updateCardWidth() {
        this.cardWidth =
          (this.cards[0].offsetWidth / this.container.offsetWidth) * 100;
        this.build();
      }

      calcPos(x, scaleFactor) {
        const centerLeft = (100 - this.cardWidth) / 2;
        const centerRight = centerLeft + this.cardWidth;

        if (x === 0) {
          return centerLeft;
        } else if (x < 0) {
          const overlapRatioLeft = 0.75;
          return centerLeft - overlapRatioLeft * (scaleFactor * this.cardWidth);
        } else {
          return centerRight - (scaleFactor * this.cardWidth) / 2;
        }
      }

      build() {
        for (let i = 0; i < this.cards.length; i++) {
          const x = i - this.centerIndex; // -1, 0, 1
          const scale = this.calcScale(x);
          const scale2 = this.calcScale2(x);
          const zIndex = -Math.abs(x);
          const leftPos = this.calcPos(x, scale2);

          this.xScale[x] = this.cards[i];
          this.updateCards(this.cards[i], { x, scale, leftPos, zIndex });
        }
      }

      controller(e) {
        const temp = { ...this.xScale };
        if (e.keyCode === 39) {
          for (let x in this.xScale) {
            const newX =
              parseInt(x) - 1 < -this.centerIndex
                ? this.centerIndex
                : parseInt(x) - 1;
            temp[newX] = this.xScale[x];
          }
        }
        if (e.keyCode === 37) {
          for (let x in this.xScale) {
            const newX =
              parseInt(x) + 1 > this.centerIndex
                ? -this.centerIndex
                : parseInt(x) + 1;
            temp[newX] = this.xScale[x];
          }
        }
        this.xScale = temp;

        for (let x in temp) {
          const scale = this.calcScale(x),
            scale2 = this.calcScale2(x),
            leftPos = this.calcPos(x, scale2),
            zIndex = -Math.abs(x);

          this.updateCards(this.xScale[x], { x, scale, leftPos, zIndex });
        }
      }

      calcScale2(x) {
        if (x <= 0) {
          return 1 - (-1 / 5) * x;
        } else {
          return 1 - (1 / 5) * x;
        }
      }

      calcScale(x) {
        const formula = 1 - (1 / 5) * Math.pow(x, 2);
        return formula <= 0 ? 0 : formula;
      }

      checkOrdering(card, x, xDist) {
        const original = parseInt(card.dataset.x);
        const rounded = Math.round(xDist);
        let newX = x;

        if (x !== x + rounded) {
          if (x + rounded > original) {
            if (x + rounded > this.centerIndex) {
              newX =
                x +
                rounded -
                1 -
                this.centerIndex -
                rounded +
                -this.centerIndex;
            }
          } else if (x + rounded < original) {
            if (x + rounded < -this.centerIndex) {
              newX =
                x + rounded + 1 + this.centerIndex - rounded + this.centerIndex;
            }
          }
          this.xScale[newX + rounded] = card;
        }
        const temp = -Math.abs(newX + rounded);
        this.updateCards(card, { zIndex: temp });
        return newX;
      }

      moveCards(data) {
        let xDist;
        if (data != null) {
          this.container.classList.remove(styles["smooth-return"]);
          const targetXDist = data.x / 150;
          this.currentXDist += (targetXDist - this.currentXDist) * 0.5;
          xDist = Math.max(
            -this.centerIndex,
            Math.min(this.centerIndex, this.currentXDist)
          );
        } else {
          this.container.classList.add(styles["smooth-return"]);
          xDist = 0;
          this.currentXDist = 0;
          for (let x in this.xScale) {
            this.updateCards(this.xScale[x], {
              x,
              zIndex: Math.abs(Math.abs(x) - this.centerIndex),
            });
          }
        }

        for (let i = 0; i < this.cards.length; i++) {
          const x = this.checkOrdering(
            this.cards[i],
            parseInt(this.cards[i].dataset.x),
            xDist
          );
          const scale = this.calcScale(x + xDist);
          const scale2 = this.calcScale2(x + xDist);
          const leftPos = this.calcPos(x + xDist, scale2);
          this.updateCards(this.cards[i], { scale, leftPos });
        }
      }

      updateCards(card, data) {
        if (data.x || data.x === 0) {
          card.setAttribute("data-x", data.x);
        }
        if (data.scale || data.scale === 0) {
          card.style.transform = `scale(${data.scale})`;
          card.style.opacity = data.scale === 0 ? data.scale : 1;
        }
        if (data.leftPos || data.leftPos === 0) {
          card.style.left = `${data.leftPos}%`;
        }
        if (data.zIndex || data.zIndex === 0) {
          if (data.zIndex === 0) {
            card.classList.add(styles.highlight);
          } else {
            card.classList.remove(styles.highlight);
          }
          card.style.zIndex = data.zIndex;
        }
      }
    }

    if (cardsContainer) {
      new CardCarouselClass(cardsContainer, cardsController);
    }

    // Once layout is computed, show the carousel
    setIsReady(true);
  }, []);

  return (
    <div
      className={styles.pageContainer}
      // Hide until layout is ready
      style={{ opacity: isReady ? 1 : 0, transition: "opacity 0.2s ease" }}
    >
      <h1 className={styles.h1}>Insights</h1>
      <div className={styles.container}>
        <div className={styles["card-carousel"]} ref={containerRef}>
          <div className={styles.card} id="1">
            <div className={styles["image-container"]}></div>
            <div className={styles.cardInfo}>
              <p className={styles.meta}>
                15 Aug 2024 | Tech Innovations | Technology
              </p>
              <h2 className={styles.title}>
                How AI is Transforming Industries
              </h2>
              <p className={styles.description}>
                Discover the latest advancements in AI and how they&apos;re
                reshaping the landscape across various sectors. From automation
                to predictive analytics, AI is a game-changer.
              </p>
            </div>
          </div>
          <div className={styles.card} id="2">
            <div className={styles["image-container"]}></div>
            <div className={styles.cardInfo}>
              <p className={styles.meta}>
                23 Aug 2024 | Digital Transformation | Business
              </p>
              <h2 className={styles.title}>
                The Future of Digital Transformation
              </h2>
              <p className={styles.description}>
                As businesses increasingly adopt digital strategies, learn about
                the trends and technologies that are driving this evolution and
                what to expect in the coming years.
              </p>
            </div>
          </div>
          <div className={styles.card} id="3">
            <div className={styles["image-container"]}></div>
            <div className={styles.cardInfo}>
              <p className={styles.meta}>
                23 Aug 2024 | Cybersecurity | Business
              </p>
              <h2 className={styles.title}>
                The Rising Importance of Cybersecurity
              </h2>
              <p className={styles.description}>
                As cyber threats evolve, businesses need strong security.
                Discover key trends like AI-driven threat detection and
                zero-trust architecture to protect digital assets.
              </p>
            </div>
          </div>
        </div>
        <a
          href="/"
          ref={controllerRef}
          className={`${styles.visuallyhidden} ${styles["card-controller"]}`}
        >
          Carousel controller
        </a>
      </div>
    </div>
  );
};

export default CardCarousel;
