"use client";

import React from 'react';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";

const Guide = () => {
  return (
    <>
      <div className="about-section">
        {/* Overview Section */}
        <div className="section">
        <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '0px' }}>Guide</h4>        <p className="p-20-regular text-dark-400" style={{ fontSize: '20px', lineHeight: '1.6', marginTop: '20px' }}>
          Learn in detail how to create, customize, and interact with your personalized AI companion.
        </p>
        <Separator className="my-4" />
    </div>

        {/* Profile Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '28px', marginTop: '40px' }}>Profiles: Crafting Unique Personas</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>
            In the Profile Creation studio, let your imagination run wild as you design a one-of-a-kind AI persona. Our intuitive forms allow you to fine-tune every aspect of your companion, from their name and background to their personality and role. Bring your AI to life with a rich, multi-faceted identity.
          </p>
          <Link href="/profiles" className="text-primary-600 hover:underline" style={{ display: 'block', marginTop: '20px' }}>Discover Example Profiles →</Link>
          <Separator className="my-8" />
        </div>

        {/* Voice Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '28px', marginTop: '40px' }}>Voices: Giving Your AI a Voice</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>
            Enter the Voice Creation suite and harness the power to clone any voice in minutes. Our state-of-the-art technology enables you to give your AI a distinct vocal presence that perfectly complements their personality. Make your companion truly unique with a voice that resonates.
          </p>
          <Link href="/voices" className="text-primary-600 hover:underline" style={{ display: 'block', marginTop: '20px' }}>Hear Example Voices →</Link>
          <Separator className="my-8" />
        </div>

        {/* Extensions Creation Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '28px', marginTop: '40px' }}>Extensions: Expanding Capabilities</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>
            In the Extension Creation workshop, the possibilities for your AI&apos;s abilities are limitless. Craft custom extensions that redefine what your AI can accomplish, transforming them into an essential part of your digital experience. Unlock new dimensions of interaction and functionality.
          </p>
          <Link href="/extensions" className="text-primary-600 hover:underline" style={{ display: 'block', marginTop: '20px' }}>Explore Example Extensions →</Link>
          <Separator className="my-8" />
        </div>

        {/* Sharing Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '28px', marginTop: '40px' }}>Sharing: A Collaborative Community</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>
            Join our thriving community of creators and share your AI masterpieces with the world. Showcase the extraordinary personalities, voices, and capabilities you&apos;ve brought to life. Connect with like-minded innovators, exchange ideas, and inspire one another to push the boundaries of AI companionship.
          </p>
          <Link href="/community" className="text-primary-600 hover:underline" style={{ display: 'block', marginTop: '20px' }}>Discover the Juno Community →</Link>
        </div>
      </div>
    </>
  )
}

export default Guide