"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const HomeBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show the banner after a short delay to ensure page load
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                zIndex: 9999,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            onClick={() => setIsVisible(false)}
        >
            <div
                style={{
                    position: "relative",
                    background: "white",
                    padding: "10px",
                    borderRadius: "10px",
                    maxWidth: "90%",
                    maxHeight: "90%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => setIsVisible(false)}
                    style={{
                        position: "absolute",
                        top: "-15px",
                        right: "-15px",
                        background: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                        zIndex: 10,
                    }}
                >
                    <IoClose size={20} color="#000" />
                </button>
                <Image
                    src="/services/CREDAI FAIRPRO Poster.png"
                    alt="CREDAI FAIRPRO Poster"
                    width={800}
                    height={600}
                    style={{
                        objectFit: "contain",
                        maxWidth: "100%",
                        maxHeight: "80vh",
                        height: "auto",
                        borderRadius: "5px",
                    }}
                />
            </div>
        </div>
    );
};

export default HomeBanner;
