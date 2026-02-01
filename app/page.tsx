"use client"

import React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Floating heart component for background watermark - using SVG for rounder hearts with animation
function FloatingHeart({ style, index }: { style: React.CSSProperties; index: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none"
      style={style}
      animate={{
        y: [0, -15, 0, 10, 0],
        x: [0, 8, 0, -8, 0],
        rotate: [0, 5, 0, -5, 0],
        scale: [1, 1.05, 1, 0.95, 1],
      }}
      transition={{
        duration: 6 + (index % 4),
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.3,
      }}
    >
      <svg viewBox="0 0 32 29.6" fill="#c9446d" fillOpacity="0.25" style={{ width: '1em', height: '1em' }}>
        <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
        c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
      </svg>
    </motion.div>
  )
}

// Generate random hearts for background
function generateHearts(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    fontSize: `${Math.random() * 80 + 40}px`,
    transform: `rotate(${Math.random() * 60 - 30}deg)`,
  }))
}

const playfulTexts = [
  "You sure? 🥺",
  "Pretty please? 💕",
  "Think again... 🤔",
  "Are you really sure? 😢",
  "Last chance! 💔",
]

const photoPlaceholders = [
  "/photos/photo1.jpeg",
  "/photos/photo2.jpg",
  "/photos/photo3.jpeg",
  "/photos/photo4.jpg",
  "/photos/photo8.jpeg",
  "/photos/photo7.jpg",
]

export default function ValentinePage() {
  const [noClickCount, setNoClickCount] = useState(0)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [accepted, setAccepted] = useState(false)
  const [hearts, setHearts] = useState<ReturnType<typeof generateHearts>>([])
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([])
  const [enlargedPhoto, setEnlargedPhoto] = useState<number | null>(null)

  useEffect(() => {
    setHearts(generateHearts(25))
  }, [])

  useEffect(() => {
    if (accepted) {
      // Show photos one by one with delay
      photoPlaceholders.forEach((_, index) => {
        setTimeout(() => {
          setVisiblePhotos((prev) => [...prev, index])
        }, 500 + index * 400)
      })
    }
  }, [accepted])

  const handleNoClick = () => {
    if (noClickCount < 5) {
      setNoClickCount((prev) => prev + 1)
      // Random position within bounds
      const maxX = 150
      const maxY = 80
      setNoButtonPosition({
        x: (Math.random() - 0.5) * maxX * 2,
        y: (Math.random() - 0.5) * maxY * 2,
      })
    }
  }

  const handleYesClick = () => {
    setAccepted(true)
  }

  const handlePhotoClick = (index: number) => {
    setEnlargedPhoto(index)
  }

  const handleBackdropClick = () => {
    setEnlargedPhoto(null)
  }

  const getYesButtonText = () => {
    if (noClickCount >= 5) {
      return "Boht hogya tera No. Chalo ab yahan click kro. Krdooo naaa pleaseee 🥺"
    }
    return "Yessss!! 💖"
  }

  const getNoButtonText = () => {
    if (noClickCount === 0) return "No 😅"
    return playfulTexts[Math.min(noClickCount - 1, playfulTexts.length - 1)]
  }

  return (
    <div className="min-h-screen overflow-hidden relative bg-[#ffd6e7]">
      {/* Background watermark hearts */}
      {hearts.map((heart, index) => (
        <FloatingHeart
          key={heart.id}
          index={index}
          style={{
            left: heart.left,
            top: heart.top,
            fontSize: heart.fontSize,
          }}
        />
      ))}

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center p-4"
          >
            {/* Main heart container */}
            <div className="relative">
              {/* Heart shape using CSS */}
              <div
                className="relative w-[320px] h-[300px] sm:w-[420px] sm:h-[380px] md:w-[500px] md:h-[450px] flex items-center justify-center"
                style={{
                  background: "#ffb6d3",
                  borderRadius: "50%",
                  transform: "rotate(-45deg)",
                  boxShadow: "0 20px 60px rgba(232, 90, 143, 0.3)",
                }}
              >
                <div
                  className="absolute w-[160px] h-[150px] sm:w-[210px] sm:h-[190px] md:w-[250px] md:h-[225px] bg-[#ffb6d3] rounded-full"
                  style={{ top: "-75px", left: "0", }}
                />
                <div
                  className="absolute w-[160px] h-[150px] sm:w-[210px] sm:h-[190px] md:w-[250px] md:h-[225px] bg-[#ffb6d3] rounded-full"
                  style={{ top: "0", right: "-75px", }}
                />
                
                {/* Content inside heart */}
                <div
                  className="relative z-10 text-center px-4 sm:px-8"
                  style={{ transform: "rotate(45deg)" }}
                >
                  {/* Cute bear hug GIF */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mb-3 sm:mb-4"
                  >
                    <img 
                      src="/images/TeddyBearGIF.gif"
                      alt="Cute bears hugging"
                      // className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto object-contain"
                      className="w-36 h-36 sm:w-40 sm:h-40 md:w-56 md:h-56 mx-auto object-contain"
                    />
                  </motion.div>

                  <motion.h1
                    className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#d6336c] mb-6 sm:mb-8 font-serif leading-tight"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Divyanshi, Would you be
                    <br />
                    my Valentine?
                  </motion.h1>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center">
                    {/* Yes Button */}
                    <motion.button
                      onClick={handleYesClick}
                      className={`
                        ${noClickCount >= 5 ? "px-4 py-3 text-sm sm:text-base" : "px-6 sm:px-8 py-3 text-base sm:text-lg"}
                        bg-[#d6336c] text-white font-semibold rounded-full
                        shadow-lg hover:bg-[#c2255c] transition-all duration-300
                        hover:shadow-xl cursor-pointer
                      `}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      animate={noClickCount >= 5 ? { 
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={noClickCount >= 5 ? {
                        duration: 1,
                        repeat: Infinity,
                      } : {}}
                    >
                      {getYesButtonText()}
                    </motion.button>

                    {/* No Button */}
                    {noClickCount < 5 && (
                      <motion.button
                        onClick={handleNoClick}
                        className="px-6 sm:px-8 py-3 bg-white text-[#d6336c] font-semibold rounded-full
                          shadow-lg hover:bg-gray-100 transition-colors duration-300 text-base sm:text-lg
                          border-2 border-[#ffb6d3] cursor-pointer"
                        animate={{
                          x: noButtonPosition.x,
                          y: noButtonPosition.y,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {getNoButtonText()}
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="accepted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex items-center justify-center relative"
          >
            {/* Celebration hearts animation */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-[#d6336c] text-2xl sm:text-4xl"
                initial={{
                  opacity: 0,
                  x: "50%",
                  y: "50%",
                }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              >
                <svg viewBox="0 0 32 29.6" fill="#d6336c" style={{ width: '1em', height: '1em' }}>
                  <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                  c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                </svg>
              </motion.div>
            ))}

            {/* Enlarged photo overlay */}
            <AnimatePresence>
              {enlargedPhoto !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center cursor-pointer"
                  onClick={handleBackdropClick}
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className="w-72 h-72 sm:w-96 sm:h-96 md:w-[450px] md:h-[450px] bg-white p-4 sm:p-5 rounded-2xl shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="w-full h-full bg-[#ffd6e7] rounded-xl flex items-center justify-center overflow-hidden">
                      <img
                        src={photoPlaceholders[enlargedPhoto as number]}
                        alt={`Photo ${enlargedPhoto as number + 1}`}
                        onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg' }}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Circular photo arrangement - using ellipse for better fit */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {photoPlaceholders.map((photo, index) => {
                // Use ellipse with wider horizontal radius, shorter vertical to fit viewport
                const angle = (index / photoPlaceholders.length) * 2 * Math.PI - Math.PI / 2
                const radiusX = 420 // Horizontal radius - wider
                const radiusY = 280 // Vertical radius - shorter to stay in viewport
                
                // Calculate x and y offsets using ellipse formula
                const xOffset = Math.cos(angle) * radiusX
                const yOffset = Math.sin(angle) * radiusY
                
                // Fixed rotation values for each photo
                const rotations = [-8, 5, -5, 8, -6, 6]
                const rotation = rotations[index] || 0
                
                // Floating animation offsets for each photo
                const floatDuration = 5 + (index % 3)
                const floatDelay = index * 0.5
                
                return (
                  <AnimatePresence key={photo}>
                    {visiblePhotos.includes(index) && (
                      <motion.div
                        initial={{ 
                          opacity: 0, 
                          scale: 0,
                        }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          x: xOffset,
                          y: yOffset,
                          rotate: rotation,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                        className="absolute z-10 pointer-events-auto cursor-pointer"
                        onClick={() => handlePhotoClick(index)}
                      >
                        <motion.div
                          className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 bg-white p-2.5 sm:p-3 rounded-xl shadow-2xl"
                          style={{ 
                            boxShadow: "0 15px 40px rgba(214, 51, 108, 0.35)",
                            transform: 'translate(-50%, -50%)',
                          }}
                          animate={{
                            y: [0, -8, 0, 6, 0],
                            x: [0, 5, 0, -5, 0],
                            rotate: [rotation, rotation + 3, rotation, rotation - 3, rotation],
                          }}
                          transition={{
                            duration: floatDuration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: floatDelay,
                          }}
                          whileHover={{ scale: 1.15 }}
                        >
                          <div className="w-full h-full bg-[#ffd6e7] rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg' }}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )
              })}
            </div>

            {/* Center celebration text */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.3,
              }}
              className="text-center z-20 px-4"
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#d6336c] font-serif mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Yayyy!!
              </motion.h1>
              <motion.p
                className="text-2xl sm:text-3xl md:text-4xl text-[#e85a8f] font-serif"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I love you soo much!!
              </motion.p>
              <motion.div
                className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              >
                <svg viewBox="0 0 32 29.6" fill="#d6336c" style={{ width: '1em', height: '1em' }}>
                  <path d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2
                  c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z"/>
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
