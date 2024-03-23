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
            The all-in-one platform for steamlined AI customization and interaction.
          </p>
          
        </div>
        <Separator className="my-4" />

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
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>Explore the Library</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>
            Discover a vast collection of ready-to-use AI components in Juno's <Link href="/library" className="text-primary-600 underline">Library</Link>, where you&apos;ll find a collection of pre-made AI profiles, voices, language models, and extensions ready for use.
          </p>
        </div>
        <Separator className="my-8" />

        {/* Dive Deeper Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>Craft Your AI in the Lab</h2>
          <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>
            Visit the <Link href="/lab" className="text-primary-600 underline">Lab</Link> to craft your own custom AI profiles, voices, and extensions tailored to your exact preferences. The possibilities are endless in the Lab.
          </p>
        </div>
        <Separator className="my-8" />

        {/* Open Architecture Section */}
        <div className="section">
          <h2 className="h2-bold text-dark-600" style={{ fontSize: '32px', marginTop: '40px' }}>Open Architecture Design</h2>
            <p className="p-20-regular text-dark-400" style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>
              Juno's open architecture design empowers users to customize every aspect of their AI experience. Mix and match <Link href="/library?type=llms" className="text-primary-600 underline">large language models</Link>, <Link href="/library?type=voices" className="text-primary-600 underline">voices</Link>, and <Link href="/library?type=extensions" className="text-primary-600 underline">extensions</Link> to create truly unique AI companions. Dive into <Link href="/lab?section=llmconfig" className="text-primary-600 underline">advanced LLM configuration</Link> to fine-tune your AI's personality, knowledge, and capabilities to perfectly suit your needs.
            </p>
        </div>
      </div>
    </>
  )
}

export default Home