"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Star, Sparkles, Users, MapPin, Calculator, FileText, Truck, Receipt } from "lucide-react"
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, useInView } from "motion/react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollY } = useScroll()
  const featuresRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)
  
  // Intersection observer for performance
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" })
  
  // Smooth mouse tracking with reduced frequency
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const smoothMouseY = useSpring(mouseY, { damping: 30, stiffness: 200 })
  
  // Optimized parallax transforms
  const y1 = useTransform(scrollY, [0, 1000], [0, -100])
  const y2 = useTransform(scrollY, [0, 1000], [0, -50])
  const y3 = useTransform(scrollY, [0, 1000], [0, -25])
  
  useEffect(() => {
    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY })
        mouseX.set(e.clientX)
        mouseY.set(e.clientY)
      })
    }
    
    // Throttle mouse events for performance
    const throttledMouseMove = (e: MouseEvent) => {
      if (rafId) return
      handleMouseMove(e)
    }
    
    window.addEventListener('mousemove', throttledMouseMove, { passive: true })
    setIsLoaded(true)
    
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [mouseX, mouseY])

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0c0a1a 0%, #1a1435 25%, #2d1b69 50%, #1e3a8a 75%, #1e40af 100%)'
      }}
    >
      {/* Premium Loading Animation */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="w-12 h-12 border-2 border-white/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cursor-following spotlight effect */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)`,
          x: smoothMouseX,
          y: smoothMouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Enhanced Interactive Particle System - Premium with more particles */}
      <div className="absolute inset-0">
        {[...Array(300)].map((_, i) => {
          const leftPosition = (i * 73 + 19) % 100;
          const topPosition = (i * 41 + 37) % 100;
          const size = ((i * 13) % 20) / 10 + 1;
          const opacity = ((i * 7) % 15) / 100 + 0.05;
          
          return (
            <motion.div
              key={i}
              className="absolute rounded-full cursor-pointer will-change-transform"
              style={{
                left: `${leftPosition}%`,
                top: `${topPosition}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                background: leftPosition < 33 
                  ? 'rgba(251, 191, 36, 0.8)'
                  : leftPosition > 66 
                  ? 'rgba(147, 197, 253, 0.8)'
                  : 'rgba(255, 255, 255, 0.6)',
              }}
              animate={{
                opacity: i % 5 === 0 ? [opacity * 0.5, 0, opacity * 1.8, 0, opacity * 0.6] : [opacity * 0.5, opacity * 1.8, opacity * 0.6],
                scale: [0.8, 1.4, 1],
                x: i % 5 === 0 ? [0, Math.sin(i * 0.1) * 8, -Math.cos(i * 0.05) * 12, Math.sin(i * 0.07) * 6, 0] : [0, Math.sin(i * 0.1) * 8, Math.cos(i * 0.05) * 4, 0],
                y: i % 5 === 0 ? [0, Math.cos(i * 0.1) * 8, Math.sin(i * 0.05) * 12, -Math.cos(i * 0.07) * 6, 0] : [0, Math.cos(i * 0.1) * 8, Math.sin(i * 0.05) * 4, 0],
                rotate: [0, 180, 360],
              }}
              whileHover={{
                scale: 3,
                opacity: 0.8,
                transition: { duration: 0.2 }
              }}
              transition={{
                duration: ((i * 11) % 40) / 10 + 6,
                repeat: Infinity,
                delay: ((i * 17) % 30) / 10,
                ease: "easeInOut"
              }}
            />
          );
        })}
      </div>

      {/* Enhanced Multi-layered ambient lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251,191,36,0.04) 0%, rgba(147,197,253,0.02) 30%, transparent 60%)`,
        }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, rgba(251,191,36,0.02) 0deg, rgba(147,197,253,0.02) 120deg, rgba(167,139,250,0.02) 240deg, rgba(251,191,36,0.02) 360deg)`,
        }}
      />
      
      {/* Enhanced Parallax background layers */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 opacity-30"
      >
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-32 w-80 h-80 bg-gradient-to-r from-blue-400/8 to-indigo-400/4 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-400/6 to-pink-400/3 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2" />
      </motion.div>
      
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 opacity-20"
      >
        <div className="absolute top-40 right-40 w-48 h-48 bg-gradient-to-r from-emerald-400/8 to-cyan-400/4 rounded-full blur-xl" />
        <div className="absolute bottom-20 left-40 w-40 h-40 bg-gradient-to-r from-orange-400/6 to-red-400/3 rounded-full blur-lg" />
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-gradient-to-r from-violet-400/5 to-purple-400/3 rounded-full blur-md" />
      </motion.div>
      {/* Hero Section */}
      <motion.section 
        className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8 overflow-hidden"
        style={{ y: y3 }}
      >
        <div className="mx-auto max-w-7xl text-center">
          <div className="mx-auto max-w-4xl">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Equipos para la industria minera",
                  "description": "Representación oficial de fabricantes europeos de equipos para minería de metales preciosos en México y América",
                  "url": "https://sualtec.com",
                  "industry": "Mining Equipment and Technology",
                  "foundingLocation": "Mexico",
                  "serviceArea": ["Mexico", "Latin America"],
                  "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Equipos para la industria minera",
                    "itemListElement": [
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Filtros"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Mangas"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Válvulas"
                        }
                      },
                      {
                        "@type": "Offer",
                        "itemOffered": {
                          "@type": "Product",
                          "name": "Bombas"
                        }
                      }
                    ]
                  }
                })
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge variant="outline" className="mb-8 px-8 py-3 text-sm font-medium border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 },
                      scale: { duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }
                    }}
                  >
                    <Sparkles className="mr-3 h-4 w-4 text-yellow-300" />
                  </motion.div>
                  <motion.span
                    animate={{ 
                      letterSpacing: ["0em", "0.05em", "0em"]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      repeatDelay: 2,
                      ease: "easeInOut"
                    }}
                  >
                    Representante Oficial en México y América
                  </motion.span>
                </Badge>
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="mb-8 text-6xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl lg:text-8xl font-playfair"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            >
              {"Sualtec".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6 + i * 0.1,
                    ease: "easeOut" 
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    color: "#FFA500",
                    textShadow: "0 0 20px rgba(255,165,0,0.5)",
                    transition: { duration: 0.2 }
                  }}
                  className="inline-block cursor-pointer"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span 
                className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent cursor-pointer font-inter"
                style={{
                  backgroundSize: "200% 200%",
                }}
                initial={{ opacity: 0, x: -30, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  opacity: { duration: 1, delay: 1.2, ease: "easeOut" },
                  x: { duration: 1, delay: 1.2, ease: "easeOut" },
                  scale: { duration: 1, delay: 1.2, ease: "easeOut" },
                  backgroundPosition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{
                  scale: 1.05,
                  filter: "drop-shadow(0 0 30px rgba(245,158,11,0.4))",
                  transition: { duration: 0.3 }
                }}
              >
                {" "}Master System
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="mx-auto mb-12 max-w-2xl text-xl leading-8 text-gray-700 dark:text-gray-100 font-inter"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
            >
              {"Representación oficial de fabricantes europeos de equipos para minería de metales preciosos en México y América. CRM especializado, cotizaciones con IA y gestión integral.".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 1.6 + i * 0.05 
                  }}
                  whileHover={{
                    scale: 1.05,
                    color: "#ffffff",
                    textShadow: "0 0 10px rgba(255,255,255,0.5)",
                    transition: { duration: 0.2 }
                  }}
                  className="inline-block cursor-pointer mr-1"
                >
                  {word}{" "}
                </motion.span>
              ))}
            </motion.p>
            
            <motion.div 
              className="flex flex-col gap-6 sm:flex-row sm:justify-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.08,
                  rotateX: 5,
                  rotateY: 5,
                }}
                whileTap={{ scale: 0.92 }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Button 
                  size="lg" 
                  className="group relative px-10 py-6 text-lg font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 border-0 shadow-2xl shadow-orange-500/30 transition-all duration-500 overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  aria-label="Acceder al sistema Sualtec Master"
                  role="button"
                  tabIndex={0}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.span
                    className="relative z-10"
                    whileHover={{ letterSpacing: "0.05em" }}
                    transition={{ duration: 0.2 }}
                  >
                    Acceder al Sistema
                  </motion.span>
                  <motion.div
                    className="relative z-10 ml-3"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ 
                      x: 8,
                      rotate: 45,
                      scale: 1.2
                    }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                  
                  {/* Particle burst effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    whileHover="hover"
                    initial="initial"
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                          left: "50%",
                          top: "50%",
                        }}
                        variants={{
                          initial: { scale: 0, opacity: 0 },
                          hover: {
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                            x: Math.cos(i * Math.PI / 4) * 30,
                            y: Math.sin(i * Math.PI / 4) * 30,
                          }
                        }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                      />
                    ))}
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotateX: -2,
                  rotateY: -2,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/dashboard">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="group relative px-10 py-6 text-lg font-semibold border-slate-300/20 bg-slate-900/20 backdrop-blur-md hover:bg-slate-800/30 hover:border-slate-300/40 text-white shadow-xl transition-all duration-500 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.span
                      className="relative z-10"
                      whileHover={{ letterSpacing: "0.05em" }}
                      transition={{ duration: 0.2 }}
                    >
                      Ver Demo
                    </motion.span>
                    
                    {/* Ripple effect */}
                    <motion.div
                      className="absolute inset-0 rounded-lg"
                      whileHover={{
                        boxShadow: "0 0 0 2px rgba(255,255,255,0.1), 0 0 0 4px rgba(255,255,255,0.05), 0 0 0 8px rgba(255,255,255,0.02)"
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
      </motion.section>

      {/* Features Section */}
      <section ref={featuresRef} className="relative px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl font-playfair"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              ¿Por qué elegir Sualtec Master System?
            </motion.h2>
            <motion.p 
              className="mx-auto mb-16 max-w-2xl text-lg text-gray-600 dark:text-gray-200 font-inter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Cada módulo está diseñado específicamente para la representación de equipos europeos en la industria minera.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card className="group border-white/[0.08] bg-black/75 backdrop-blur-xl transition-all duration-300 hover:bg-black/65 hover:border-white/15 relative overflow-hidden rounded-2xl shadow-2xl shadow-black/20 hover:shadow-orange-500/20 cursor-pointer">
                
                {/* Enhanced gradient overlay with glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-400/3 via-transparent to-yellow-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  whileHover={{
                    boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.1), 0 0 20px rgba(251,146,60,0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <CardHeader className="pb-6 pt-6 relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.05] shadow-lg shadow-black/10 group-hover:shadow-orange-500/20"
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, -10, 10, 0],
                      backgroundColor: "rgba(251,146,60,0.1)",
                      transition: { duration: 0.4, rotate: { duration: 0.6 } }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <MapPin className="h-7 w-7 text-orange-300 group-hover:text-orange-200 transition-colors duration-300" />
                  </motion.div>
                  
                  <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-orange-100 transition-all duration-300 mb-3 font-semibold font-playfair">
                    Directorio de Clientes
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 dark:text-gray-200 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed font-inter">
                    Gestión completa de operaciones mineras, plantas de procesamiento y ubicaciones detalladas.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card className="group border-white/[0.08] bg-black/75 backdrop-blur-xl transition-all duration-300 hover:bg-black/65 hover:border-white/15 relative overflow-hidden rounded-2xl shadow-2xl shadow-black/20 hover:shadow-emerald-500/20 cursor-pointer">
                
                {/* Enhanced gradient overlay with glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-emerald-400/3 via-transparent to-blue-400/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  whileHover={{
                    boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.1), 0 0 20px rgba(16,185,129,0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <CardHeader className="pb-6 pt-6 relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.05] shadow-lg shadow-black/10 group-hover:shadow-emerald-500/20"
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, 15, -15, 0],
                      backgroundColor: "rgba(16,185,129,0.1)",
                      transition: { duration: 0.4, rotate: { duration: 0.6 } }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Calculator className="h-7 w-7 text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300" />
                  </motion.div>
                  
                  <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-emerald-100 transition-all duration-300 mb-3 font-semibold font-playfair">
                    Cotizador de Equipos IA
                  </CardTitle>
                  
                  <CardDescription className="text-gray-600 dark:text-gray-200 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed font-inter">
                    Cotizaciones especializadas para equipos de procesamiento de oro, plata y metales preciosos.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card className="group border-white/[0.08] bg-black/75 backdrop-blur-xl transition-all duration-700 hover:bg-black/65 hover:border-white/15 relative overflow-hidden rounded-2xl shadow-2xl shadow-black/20 hover:shadow-blue-500/20 cursor-pointer">
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-blue-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ background: "linear-gradient(45deg, transparent, transparent)" }}
                  whileHover={{
                    background: [
                      "linear-gradient(45deg, transparent, rgba(59,130,246,0.1), transparent)",
                      "linear-gradient(135deg, transparent, rgba(59,130,246,0.1), transparent)",
                      "linear-gradient(225deg, transparent, rgba(59,130,246,0.1), transparent)",
                      "linear-gradient(315deg, transparent, rgba(59,130,246,0.1), transparent)",
                      "linear-gradient(45deg, transparent, rgba(59,130,246,0.1), transparent)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <CardHeader className="pb-6 pt-6 relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.05] shadow-lg shadow-black/10 group-hover:shadow-blue-500/20"
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, 10, -10, 0],
                      backgroundColor: "rgba(59,130,246,0.1)",
                      transition: { duration: 0.4 }
                    }}
                    animate={{
                      boxShadow: [
                        "0 4px 20px rgba(0,0,0,0.1)",
                        "0 8px 30px rgba(59,130,246,0.1)",
                        "0 4px 20px rgba(0,0,0,0.1)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      animate={{ rotateX: [0, 180, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Users className="h-7 w-7 text-blue-300 group-hover:text-blue-200 transition-colors duration-300" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-blue-100 transition-all duration-300 mb-3 font-semibold font-playfair">
                      {"CRM Avanzado".split("").map((char, i) => (
                        <motion.span
                          key={i}
                          whileHover={{
                            color: "#3b82f6",
                            textShadow: "0 0 10px rgba(59,130,246,0.5)",
                            scale: 1.1,
                          }}
                          transition={{ duration: 0.1, delay: i * 0.02 }}
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 dark:text-gray-200 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed font-inter">
                      {"Gestión especializada de operaciones mineras, prospectos y seguimientos comerciales.".split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ color: "#ffffff", scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block mr-1"
                        >
                          {word}{" "}
                        </motion.span>
                      ))}
                    </CardDescription>
                  </motion.div>
                </CardHeader>
              </Card>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card className="group border-white/[0.08] bg-black/75 backdrop-blur-xl transition-all duration-700 hover:bg-black/65 hover:border-white/15 relative overflow-hidden rounded-2xl shadow-2xl shadow-black/20 hover:shadow-purple-500/20">
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-400/0 via-purple-400/10 to-pink-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ background: "linear-gradient(45deg, transparent, transparent)" }}
                  whileHover={{
                    background: [
                      "linear-gradient(45deg, transparent, rgba(147,51,234,0.1), transparent)",
                      "linear-gradient(135deg, transparent, rgba(147,51,234,0.1), transparent)",
                      "linear-gradient(225deg, transparent, rgba(147,51,234,0.1), transparent)",
                      "linear-gradient(315deg, transparent, rgba(147,51,234,0.1), transparent)",
                      "linear-gradient(45deg, transparent, rgba(147,51,234,0.1), transparent)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <CardHeader className="pb-6 pt-6 relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.05] shadow-lg shadow-black/10 group-hover:shadow-purple-500/20"
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, -8, 8, 0],
                      backgroundColor: "rgba(147,51,234,0.1)",
                      transition: { duration: 0.4 }
                    }}
                    animate={{
                      boxShadow: [
                        "0 4px 20px rgba(0,0,0,0.1)",
                        "0 8px 30px rgba(147,51,234,0.1)",
                        "0 4px 20px rgba(0,0,0,0.1)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      animate={{ rotateY: [0, 180, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FileText className="h-7 w-7 text-purple-300 group-hover:text-purple-200 transition-colors duration-300" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-purple-100 transition-all duration-300 mb-3 font-semibold">
                      {"Gestión Documental".split("").map((char, i) => (
                        <motion.span
                          key={i}
                          whileHover={{
                            color: "#9333ea",
                            textShadow: "0 0 10px rgba(147,51,234,0.5)",
                            scale: 1.1,
                          }}
                          transition={{ duration: 0.1, delay: i * 0.02 }}
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 dark:text-gray-200 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed">
                      {"Catálogos especializados en equipos para procesamiento de metales y documentación técnica.".split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ color: "#ffffff", scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block mr-1"
                        >
                          {word}{" "}
                        </motion.span>
                      ))}
                    </CardDescription>
                  </motion.div>
                </CardHeader>
              </Card>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card className="group border-white/[0.08] bg-black/75 backdrop-blur-xl transition-all duration-700 hover:bg-black/65 hover:border-white/15 relative overflow-hidden rounded-2xl shadow-2xl shadow-black/20 hover:shadow-cyan-500/20">
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-cyan-400/10 to-teal-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ background: "linear-gradient(45deg, transparent, transparent)" }}
                  whileHover={{
                    background: [
                      "linear-gradient(45deg, transparent, rgba(6,182,212,0.1), transparent)",
                      "linear-gradient(135deg, transparent, rgba(6,182,212,0.1), transparent)",
                      "linear-gradient(225deg, transparent, rgba(6,182,212,0.1), transparent)",
                      "linear-gradient(315deg, transparent, rgba(6,182,212,0.1), transparent)",
                      "linear-gradient(45deg, transparent, rgba(6,182,212,0.1), transparent)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <CardHeader className="pb-6 pt-6 relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.05] shadow-lg shadow-black/10 group-hover:shadow-cyan-500/20"
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, 12, -12, 0],
                      backgroundColor: "rgba(6,182,212,0.1)",
                      transition: { duration: 0.4 }
                    }}
                    animate={{
                      boxShadow: [
                        "0 4px 20px rgba(0,0,0,0.1)",
                        "0 8px 30px rgba(6,182,212,0.1)",
                        "0 4px 20px rgba(0,0,0,0.1)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      animate={{ rotateZ: [0, 360] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    >
                      <Truck className="h-7 w-7 text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-cyan-100 transition-all duration-300 mb-3 font-semibold">
                      {"Fabricantes Europeos".split("").map((char, i) => (
                        <motion.span
                          key={i}
                          whileHover={{
                            color: "#06b6d4",
                            textShadow: "0 0 10px rgba(6,182,212,0.5)",
                            scale: 1.1,
                          }}
                          transition={{ duration: 0.1, delay: i * 0.02 }}
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 dark:text-gray-200 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed">
                      {"Base de datos de fabricantes europeos especializados en tecnología minera avanzada.".split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ color: "#ffffff", scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block mr-1"
                        >
                          {word}{" "}
                        </motion.span>
                      ))}
                    </CardDescription>
                  </motion.div>
                </CardHeader>
              </Card>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.4, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              <Card className="group border-white/[0.08] bg-black/75 backdrop-blur-xl transition-all duration-700 hover:bg-black/65 hover:border-white/15 relative overflow-hidden rounded-2xl shadow-2xl shadow-black/20 hover:shadow-amber-500/20">
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-amber-400/10 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  initial={{ background: "linear-gradient(45deg, transparent, transparent)" }}
                  whileHover={{
                    background: [
                      "linear-gradient(45deg, transparent, rgba(245,158,11,0.1), transparent)",
                      "linear-gradient(135deg, transparent, rgba(245,158,11,0.1), transparent)",
                      "linear-gradient(225deg, transparent, rgba(245,158,11,0.1), transparent)",
                      "linear-gradient(315deg, transparent, rgba(245,158,11,0.1), transparent)",
                      "linear-gradient(45deg, transparent, rgba(245,158,11,0.1), transparent)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <CardHeader className="pb-6 pt-6 relative z-10">
                  <motion.div 
                    className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.05] shadow-lg shadow-black/10 group-hover:shadow-amber-500/20"
                    whileHover={{ 
                      scale: 1.15,
                      rotate: [0, 15, -15, 0],
                      backgroundColor: "rgba(245,158,11,0.1)",
                      transition: { duration: 0.4 }
                    }}
                    animate={{
                      boxShadow: [
                        "0 4px 20px rgba(0,0,0,0.1)",
                        "0 8px 30px rgba(245,158,11,0.1)",
                        "0 4px 20px rgba(0,0,0,0.1)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      animate={{ 
                        rotateX: [0, 360],
                        rotateY: [0, 180]
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Receipt className="h-7 w-7 text-amber-300 group-hover:text-amber-200 transition-colors duration-300" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardTitle className="text-xl text-gray-900 dark:text-white group-hover:text-amber-100 transition-all duration-300 mb-3 font-semibold">
                      {"Facturación Digital".split("").map((char, i) => (
                        <motion.span
                          key={i}
                          whileHover={{
                            color: "#f59e0b",
                            textShadow: "0 0 10px rgba(245,158,11,0.5)",
                            scale: 1.1,
                          }}
                          transition={{ duration: 0.1, delay: i * 0.02 }}
                          className="inline-block"
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))}
                    </CardTitle>
                    
                    <CardDescription className="text-gray-600 dark:text-gray-200 group-hover:text-gray-100 transition-colors duration-300 leading-relaxed">
                      {"Sistema completo de facturación electrónica y control contable.".split(" ").map((word, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ color: "#ffffff", scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                          className="inline-block mr-1"
                        >
                          {word}{" "}
                        </motion.span>
                      ))}
                    </CardDescription>
                  </motion.div>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/10 rounded-full blur-md" />
        </motion.div>
        
        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="mb-4 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl font-playfair"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Confianza de la Industria
            </motion.h2>
            <motion.p 
              className="mx-auto mb-16 max-w-2xl text-lg text-stone-600 dark:text-stone-400 font-inter"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Conoce la experiencia de operaciones mineras que confían en nuestros equipos europeos.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -15 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="border-white/[0.08] bg-black/75 backdrop-blur-xl relative overflow-hidden group rounded-2xl shadow-2xl shadow-black/20">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-stone-100/20 via-transparent to-stone-200/20 dark:from-stone-700/20 dark:to-stone-600/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
                <CardContent className="p-6 relative z-10">
                  <motion.div 
                    className="mb-4 flex"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1, delay: 0.3 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.p 
                    className="mb-4 text-stone-600 dark:text-stone-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    &ldquo;Los equipos de procesamiento de oro que suministra Sualtec han aumentado significativamente nuestro rendimiento.&rdquo;
                  </motion.p>
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Avatar className="mr-3 h-10 w-10">
                        <AvatarImage src="/avatars/01.png" />
                        <AvatarFallback>RM</AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div>
                      <p className="font-medium text-stone-900 dark:text-stone-50">Roberto Martínez</p>
                      <p className="text-sm text-stone-600 dark:text-stone-400">Director de Operaciones, Mina de Oro Rodeo</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -15 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="border-white/[0.08] bg-black/75 backdrop-blur-xl relative overflow-hidden group rounded-2xl shadow-2xl shadow-black/20">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-stone-100/20 via-transparent to-stone-200/20 dark:from-stone-700/20 dark:to-stone-600/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
                <CardContent className="p-6 relative z-10">
                  <motion.div 
                    className="mb-4 flex"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1, delay: 0.3 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.p 
                    className="mb-4 text-stone-600 dark:text-stone-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    &ldquo;Las cotizaciones especializadas para equipos de refinación de plata y el CRM nos han permitido expandir operaciones eficientemente.&rdquo;
                  </motion.p>
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Avatar className="mr-3 h-10 w-10">
                        <AvatarImage src="/avatars/02.png" />
                        <AvatarFallback>LC</AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div>
                      <p className="font-medium text-stone-900 dark:text-stone-50">Laura Cervantes</p>
                      <p className="text-sm text-stone-600 dark:text-stone-400">Gerente de Procesos, Minera Plata Orisyvo</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 50, rotateX: -15 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  rotateX: 0,
                  transition: { duration: 0.7, ease: "easeOut" }
                }
              }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="border-white/[0.08] bg-black/75 backdrop-blur-xl relative overflow-hidden group rounded-2xl shadow-2xl shadow-black/20">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-stone-100/20 via-transparent to-stone-200/20 dark:from-stone-700/20 dark:to-stone-600/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.5 }}
                />
                <CardContent className="p-6 relative z-10">
                  <motion.div 
                    className="mb-4 flex"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1, delay: 0.3 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                      >
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <motion.p 
                    className="mb-4 text-stone-600 dark:text-stone-400"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    &ldquo;Los catálogos especializados en equipos de concentración minera y la gestión automatizada han revolucionado nuestras compras.&rdquo;
                  </motion.p>
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <Avatar className="mr-3 h-10 w-10">
                        <AvatarImage src="/avatars/03.png" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div>
                      <p className="font-medium text-stone-900 dark:text-stone-50">Ana Salinas</p>
                      <p className="text-sm text-stone-600 dark:text-stone-400">Directora de Adquisiciones, Minera Cordero Gold</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        />
        
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          transition={{ duration: 2 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              duration: 12, 
              ease: "easeInOut", 
              repeat: Infinity 
            }}
          />
        </motion.div>
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <motion.h2 
            className="mb-4 text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl font-playfair"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            ¿Listo para Modernizar tu Negocio?
          </motion.h2>
          <motion.p 
            className="mx-auto mb-8 max-w-2xl text-lg text-stone-600 dark:text-stone-400 font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Únete a las operaciones mineras líderes que ya optimizan sus procesos con equipos europeos a través de Sualtec.
          </motion.p>
          <motion.div 
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="group px-8 py-6 text-lg relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-stone-600 to-stone-700 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Ver Catálogo</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ 
                scale: 1.05,
                borderColor: "rgb(120 113 108)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
                Solicitar Cotización
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="border-t border-white/[0.08] bg-black/75 backdrop-blur-xl relative shadow-2xl shadow-black/20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div 
            className="grid gap-8 md:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="md:col-span-2"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <motion.h3 
                className="mb-4 text-2xl font-bold text-gray-900 dark:text-white"
                whileHover={{ scale: 1.02 }}
              >
                Sualtec Master System
              </motion.h3>
              <p className="mb-4 max-w-md text-gray-600 dark:text-gray-300">
                Optimizando las operaciones industriales y mineras a través de tecnología de vanguardia y diseño intuitivo.
              </p>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Plataforma</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><motion.a href="#" whileHover={{ x: 5, color: "rgb(28 25 23)" }} className="hover:text-stone-900 dark:hover:text-stone-50 block">CRM</motion.a></li>
                <li><motion.a href="#" whileHover={{ x: 5, color: "rgb(28 25 23)" }} className="hover:text-stone-900 dark:hover:text-stone-50 block">Cotizaciones</motion.a></li>
                <li><motion.a href="#" whileHover={{ x: 5, color: "rgb(28 25 23)" }} className="hover:text-stone-900 dark:hover:text-stone-50 block">Facturación</motion.a></li>
                <li><motion.a href="#" whileHover={{ x: 5, color: "rgb(28 25 23)" }} className="hover:text-stone-900 dark:hover:text-stone-50 block">Reportes</motion.a></li>
              </ul>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
            >
              <h4 className="mb-4 font-semibold text-gray-900 dark:text-white">Empresa</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li><motion.a href="#" whileHover={{ x: 5, color: "rgb(28 25 23)" }} className="hover:text-stone-900 dark:hover:text-stone-50 block">Nosotros</motion.a></li>
                <li><motion.a href="#" whileHover={{ x: 5, color: "rgb(28 25 23)" }} className="hover:text-stone-900 dark:hover:text-stone-50 block">Blog</motion.a></li>
                <li><motion.a href="#" whileHover={{ x: 5, color: "rgb(28 25 23)" }} className="hover:text-stone-900 dark:hover:text-stone-50 block">Carreras</motion.a></li>
                <li><motion.a href="#" whileHover={{ x: 5, color: "rgb(28 25 23)" }} className="hover:text-stone-900 dark:hover:text-stone-50 block">Contacto</motion.a></li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Separator className="my-8" />
          </motion.div>
          <motion.div 
            className="flex flex-col items-center justify-between gap-4 md:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.p 
              className="text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.02 }}
            >
              © 2025 Sualtec Master System. Todos los derechos reservados.
            </motion.p>
            <motion.div 
              className="flex gap-4 text-gray-600 dark:text-gray-300"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              viewport={{ once: true }}
            >
              <motion.a 
                href="#" 
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ y: -2, color: "rgb(28 25 23)" }} 
                className="hover:text-white"
              >
                Privacidad
              </motion.a>
              <motion.a 
                href="#" 
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ y: -2, color: "rgb(28 25 23)" }} 
                className="hover:text-white"
              >
                Términos
              </motion.a>
              <motion.a 
                href="#" 
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ y: -2, color: "rgb(28 25 23)" }} 
                className="hover:text-white"
              >
                Cookies
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}
