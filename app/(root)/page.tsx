"use client";

import React from 'react';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator";

const Home = () => {
  return (
    <>
      <div className="about-section">
        <div className="space-y-6">
          <h4 className="h2-bold text-dark-600" style={{ fontSize: '55px', marginTop: '0px' }}>Welcome to Juno</h4>
          <p className="p-20-regular text-dark-400" style={{ marginTop: '15px' }}>
            Create, customize, and seamlessly interact with your own personalized AI directly within your webbrowser.
          </p>
          
        </div>
        <Separator className="my-8" />

        {/* Getting Started Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>Getting Started</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>
            Get started by exploring Juno&apos;s <Link href="/quickstart" className="text-primary-600 underline">Quick Start guide</Link>. This step-by-step tutorial will walk you through creating and integrating your own personalized AI in minutes.
          </p>
        </div>
        <Separator className="my-8" />

        
        {/* Explore Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>Explore Juno</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>
            Discover Juno&apos;s extensive features and capabilities by browsing the <Link href="/library" className="text-primary-600 underline">Library</Link>, where you&apos;ll find a collection of pre-made AI profiles, voices, language models, and extensions crafted by our community.
          </p>
        </div>
        <Separator className="my-8" />

        {/* Dive Deeper Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>Unleash Your Creativity</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>
            Visit the <Link href="/lab" className="text-primary-600 underline">Lab</Link> to craft your own custom AI profiles, voices, and extensions tailored to your exact preferences. Let your imagination soar as you design your perfect AI.
          </p>
        </div>
        <Separator className="my-8" />

        {/* Community Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>Join the Community</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>
            Connect with like-minded creators in the Juno community. Share your creations, draw inspiration from others, and collaborate to push the boundaries of AI customization together.
          </p>
        </div>
        <Separator className="my-8" />

        {/* Get Started Now Section */}
        <div className="section text-center">
          <Link href="/quickstart">
            <button className="button bg-primary-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-primary-700 transition-colors duration-200">Create Your AI Companion</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home