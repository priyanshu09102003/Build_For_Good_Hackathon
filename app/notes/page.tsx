import { BackgroundEffects } from '@/components/landing/BackgroundEffects'
import { NotesGenerator } from '@/components/notes/notes-generator'
import { Sparkles } from 'lucide-react'
import React from 'react'

const NotesPage = () => {
  return (
    <main className="min-h-screen">
       <BackgroundEffects />
      <header className="mx-auto max-w-4xl px-4 pt-16 pb-10 text-center sm:pt-24">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-semibold text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Diagrammatic Revision Notes
        </span>
        <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Turn anything into{" "}
          <span className="text-gradient">beautiful exam notes</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          Describe a topic or upload a PDF, and get clear, structured revision notes
          with colourful diagrams — ready to download as a PDF.
        </p>
      </header>
      <NotesGenerator/>
    </main>
  )
}

export default NotesPage
