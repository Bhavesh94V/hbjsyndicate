"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Phone, Send, CheckCircle, Clock, MessageSquare, Users } from "lucide-react"
import EnhancedThreeBackground from "@/components/enhanced-three-background"
import GSAPAnimations from "@/components/gsap-animations"
import { gsap } from "gsap"
import { submitContactForm } from "./actions"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  useEffect(() => {
    gsap.fromTo(".contact-hero", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" })
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitResult(null)

    const formData = new FormData(event.currentTarget)

    try {
      const result = await submitContactForm(formData)
      setSubmitResult(result)

      if (result.success) {
        // Reset form on success
        event.currentTarget.reset()
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "Something went wrong. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <EnhancedThreeBackground variant="hero" />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-appex-navy/95 via-appex-blue/90 to-appex-accent/85"></div>
        <div className="contact-hero relative container mx-auto px-4 py-20 z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <Badge className="mb-8 bg-appex-gold/20 text-appex-gold border-appex-gold/30 text-lg px-6 py-3 backdrop-blur-sm font-medium">
              Let's Connect
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 bg-gradient-to-r from-white to-appex-gold bg-clip-text text-transparent">
              Let's Discuss Your Digital Vision!
            </h1>
            <p className="text-xl text-appex-silver max-w-4xl mx-auto leading-relaxed">
              Ready to transform your ideas into exceptional digital experiences? We're here to help you every step of
              the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-24 relative">
        <EnhancedThreeBackground variant="section" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <GSAPAnimations animation="slideInLeft">
                <Card className="border-slate-200 shadow-2xl bg-white/95 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-3xl font-display font-bold text-appex-navy flex items-center">
                      <MessageSquare className="mr-3 h-8 w-8 text-appex-gold" />
                      Start Your Project
                    </CardTitle>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-base font-medium text-appex-navy">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="mt-2 h-12 border-slate-300 focus:border-appex-gold focus:ring-appex-gold/20"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-base font-medium text-appex-navy">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-2 h-12 border-slate-300 focus:border-appex-gold focus:ring-appex-gold/20"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="phone" className="text-base font-medium text-appex-navy">
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            className="mt-2 h-12 border-slate-300 focus:border-appex-gold focus:ring-appex-gold/20"
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <Label htmlFor="projectType" className="text-base font-medium text-appex-navy">
                            Project Type *
                          </Label>
                          <Select name="projectType" required>
                            <SelectTrigger className="mt-2 h-12 border-slate-300 focus:border-appex-gold focus:ring-appex-gold/20">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="website">Custom Website</SelectItem>
                              <SelectItem value="ecommerce">E-commerce Store</SelectItem>
                              <SelectItem value="webapp">Web Application</SelectItem>
                              <SelectItem value="redesign">Website Redesign</SelectItem>
                              <SelectItem value="maintenance">Maintenance & Support</SelectItem>
                              <SelectItem value="consultation">Consultation</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="message" className="text-base font-medium text-appex-navy">
                          Project Details *
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          className="mt-2 border-slate-300 focus:border-appex-gold focus:ring-appex-gold/20"
                          placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                        />
                      </div>

                      {submitResult && (
                        <div
                          className={`p-4 rounded-lg ${
                            submitResult.success
                              ? "bg-green-50 text-green-800 border border-green-200"
                              : "bg-red-50 text-red-800 border border-red-200"
                          }`}
                        >
                          <div className="flex items-center">
                            {submitResult.success ? (
                              <CheckCircle className="h-5 w-5 mr-2" />
                            ) : (
                              <MessageSquare className="h-5 w-5 mr-2" />
                            )}
                            {submitResult.message}
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-appex-gold to-appex-blue hover:from-appex-blue hover:to-appex-navy text-white w-full h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 font-medium"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </GSAPAnimations>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <GSAPAnimations animation="slideInRight" delay={0.2}>
                <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-display font-semibold text-appex-navy mb-6 flex items-center">
                      <Phone className="mr-3 h-6 w-6 text-appex-gold" />
                      Get in Touch
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <Mail className="h-6 w-6 text-appex-gold mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-appex-navy text-lg">Email</p>
                          <p className="text-slate-600">hello@appexinnovations.com</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <Phone className="h-6 w-6 text-appex-gold mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-appex-navy text-lg">Phone</p>
                          <p className="text-slate-600 font-medium">9173922112</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-6 w-6 text-appex-gold mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-appex-navy text-lg">Location</p>
                          <p className="text-slate-600">India</p>
                          <p className="text-sm text-slate-500 mt-1">Serving businesses globally</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </GSAPAnimations>

              <GSAPAnimations animation="scaleIn" delay={0.4}>
                <Card className="border-slate-200 shadow-lg bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-display font-semibold text-appex-navy mb-6 flex items-center">
                      <Clock className="mr-3 h-6 w-6 text-appex-gold" />
                      What Happens Next?
                    </h3>
                    <div className="space-y-6">
                      {[
                        { step: "1", title: "Quick Response", desc: "We'll respond within 24 hours" },
                        { step: "2", title: "Discovery Call", desc: "Free consultation to understand your needs" },
                        { step: "3", title: "Custom Proposal", desc: "Detailed project plan and timeline" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-appex-gold to-appex-blue rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-bold">{item.step}</span>
                          </div>
                          <div>
                            <p className="font-medium text-appex-navy">{item.title}</p>
                            <p className="text-sm text-slate-600">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </GSAPAnimations>

              <GSAPAnimations animation="fadeInUp" delay={0.6}>
                <Card className="border-slate-200 bg-gradient-to-br from-appex-light to-slate-50 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-appex-gold" />
                      <h3 className="text-xl font-display font-semibold text-appex-navy">Why Choose Us?</h3>
                    </div>
                    <ul className="space-y-3 text-slate-600">
                      <li className="flex items-center">
                        <Users className="h-4 w-4 text-appex-gold mr-2 flex-shrink-0" />
                        Direct access to experienced founders
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-appex-gold mr-2 flex-shrink-0" />
                        No outsourcing - all work done in-house
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-appex-gold mr-2 flex-shrink-0" />
                        Future-ready, scalable solutions
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-appex-gold mr-2 flex-shrink-0" />
                        Transparent communication
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-appex-gold mr-2 flex-shrink-0" />
                        Ongoing support and maintenance
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </GSAPAnimations>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-appex-light to-slate-50 relative">
        <div className="container mx-auto px-4">
          <GSAPAnimations animation="fadeInUp" trigger=".faq-section">
            <div className="faq-section text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-appex-navy mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Quick answers to common questions about working with Appex Innovations
              </p>
            </div>
          </GSAPAnimations>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How long does a typical project take?",
                answer:
                  "Project timelines vary based on complexity. A simple website typically takes 2-4 weeks, while complex web applications can take 8-16 weeks. We'll provide a detailed timeline during our consultation.",
              },
              {
                question: "Do you provide ongoing support after launch?",
                answer:
                  "Yes! We offer comprehensive maintenance and support packages to keep your website secure, updated, and performing optimally. We believe in long-term partnerships with our clients.",
              },
              {
                question: "What technologies do you work with?",
                answer:
                  "We're full-stack developers proficient in modern technologies including React, Vue, Node.js, Python, Django, PostgreSQL, MongoDB, AWS, and more. We choose the best tech stack for each project.",
              },
              {
                question: "What's included in your pricing?",
                answer:
                  "Our pricing includes design, development, testing, deployment, and initial support. We provide transparent pricing with no hidden costs and detailed project proposals.",
              },
              {
                question: "Can you help with existing website improvements?",
                answer:
                  "We offer website redesign, performance optimization, feature additions, and modernization services for existing websites and applications.",
              },
            ].map((faq, index) => (
              <GSAPAnimations key={index} animation="fadeInUp" delay={index * 0.1}>
                <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-display font-semibold text-appex-navy mb-3">{faq.question}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </GSAPAnimations>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-appex-navy to-appex-blue text-white relative overflow-hidden">
        <EnhancedThreeBackground variant="minimal" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <GSAPAnimations animation="fadeInUp">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-xl text-appex-silver mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the growing list of satisfied clients who trust Appex Innovations with their digital success
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-appex-gold to-appex-silver hover:from-appex-silver hover:to-appex-gold text-appex-navy px-10 py-4 text-lg shadow-2xl hover:shadow-appex-gold/25 transition-all duration-500 transform hover:scale-105 font-medium"
              >
                Schedule Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-appex-gold text-appex-gold hover:bg-appex-gold/10 px-10 py-4 text-lg bg-transparent backdrop-blur-sm hover:border-appex-silver transition-all duration-500 transform hover:scale-105 font-medium"
              >
                View Our Portfolio
              </Button>
            </div>
          </GSAPAnimations>
        </div>
      </section>
    </div>
  )
}
