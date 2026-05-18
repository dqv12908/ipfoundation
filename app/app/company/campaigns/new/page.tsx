'use client'

import { useState, useEffect } from 'react'
import { parseEther } from 'viem'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useRouter } from 'next/navigation'
import { campaignFactoryAbi } from '@/lib/platform/generated'
import { PLATFORM_FACTORY_ADDRESS } from '@/lib/platform/config'
import dynamic from 'next/dynamic'
import { TransactionButton } from '@/components/platform/shared/TransactionButton'
import { ConnectWalletPrompt } from '@/components/platform/shared/ConnectWalletPrompt'
import { useCompanyAuth } from '@/lib/platform/company-auth'
import { ImageUpload } from '@/components/platform/ui/ImageUpload'
import { FileUpload } from '@/components/platform/ui/FileUpload'

const RichTextEditor = dynamic(
  () => import('@/components/platform/ui/RichTextEditor').then((m) => m.RichTextEditor),
  { ssr: false, loading: () => <div className="h-[320px] rounded-xl border border-border bg-white/[0.015] shimmer" /> },
)

interface UploadedFile {
  name: string
  size: number
  type: string
  dataUrl: string
}

const sectionNav = [
  { id: 'brand', label: 'Brand' },
  { id: 'story', label: 'Story' },
  { id: 'media', label: 'Media' },
  { id: 'social', label: 'Social' },
  { id: 'legal', label: 'Legal' },
  { id: 'token', label: 'Token' },
  { id: 'raise', label: 'Raise' },
  { id: 'timeline', label: 'Timeline' },
]

export default function NewCampaignPage() {
  const router = useRouter()
  const { isConnected, address } = useAccount()
  const { company: companyAuth } = useCompanyAuth()
  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isConfirmed) {
      router.push('/app/company')
    }
  }, [isConfirmed, router])

  /* ── Form state ── */
  const [form, setForm] = useState({
    name: '',
    symbol: '',
    tagline: '',
    metadataURI: '',
    minRaise: '',
    maxRaise: '',
    tokenPrice: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  })

  const [description, setDescription] = useState('')
  const [logo, setLogo] = useState<{ url: string | null; file: File | null }>({ url: null, file: null })
  const [cover, setCover] = useState<{ url: string | null; file: File | null }>({ url: null, file: null })
  const [gallery, setGallery] = useState<Array<{ url: string; file: File }>>([])
  const [videoUrl, setVideoUrl] = useState('')
  const [social, setSocial] = useState({ website: '', twitter: '', discord: '', telegram: '', github: '' })
  const [whitepaper, setWhitepaper] = useState<UploadedFile | null>(null)
  const [terms, setTerms] = useState<UploadedFile | null>(null)
  const [pitchDeck, setPitchDeck] = useState<UploadedFile | null>(null)

  const [activeSection, setActiveSection] = useState('brand')

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function updateSocial(field: string, value: string) {
    setSocial((prev) => ({ ...prev, [field]: value }))
  }

  function addGalleryImage(dataUrl: string | null, file: File | null) {
    if (!dataUrl || !file) return
    if (gallery.length >= 6) return
    setGallery((prev) => [...prev, { url: dataUrl, file }])
  }

  function removeGalleryImage(index: number) {
    setGallery((prev) => prev.filter((_, i) => i !== index))
  }

  function handleSubmit() {
    const startTimestamp = Math.floor(new Date(`${form.startDate}T${form.startTime}`).getTime() / 1000)
    const endTimestamp = Math.floor(new Date(`${form.endDate}T${form.endTime}`).getTime() / 1000)

    // In production: upload images/files to IPFS, build metadata JSON, upload that, get CID → metadataURI
    // For MVP: metadataURI is optional and metadata is stored locally
    writeContract({
      address: PLATFORM_FACTORY_ADDRESS,
      abi: campaignFactoryAbi,
      functionName: 'createCampaign',
      args: [
        form.name,
        form.symbol,
        form.metadataURI,
        parseEther(form.minRaise),
        parseEther(form.maxRaise),
        parseEther(form.tokenPrice),
        BigInt(startTimestamp),
        BigInt(endTimestamp),
        '0x0000000000000000000000000000000000000000' as `0x${string}`,
      ],
    })
  }

  function scrollToSection(id: string) {
    setActiveSection(id)
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Check wallet matches company account
  const walletMismatch = isConnected && companyAuth && address?.toLowerCase() !== companyAuth.walletAddress.toLowerCase()

  const isValid = form.name && form.symbol && form.minRaise && form.maxRaise && form.tokenPrice && form.startDate && form.startTime && form.endDate && form.endTime

  return (
    <div className="mx-auto max-w-5xl animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <p className="label-caps mb-2 tracking-widest text-accent">New Campaign</p>
        <h1
          className="text-2xl font-extrabold tracking-tight sm:text-3xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Launch Your Campaign
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
          Build a compelling campaign page that gives investors everything they need to commit.
          Rich media, clear terms, and transparent parameters.
        </p>
      </div>

      <div className="flex gap-8">
        {/* Sticky section nav (desktop) */}
        <nav className="hidden w-40 flex-shrink-0 lg:block">
          <div className="sticky top-20 space-y-0.5">
            {sectionNav.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                className={`block w-full rounded-md px-3 py-1.5 text-left text-xs font-medium transition-colors ${
                  activeSection === s.id
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Form */}
        <div className="min-w-0 flex-1 space-y-8">

          {/* ──────────────── BRAND & IDENTITY ──────────────── */}
          <section id="section-brand" className="panel p-6">
            <SectionHeader
              number="01"
              title="Brand & Identity"
              subtitle="Your token's name, symbol, and visual identity. First impressions matter."
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-text-secondary">Token Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Nexus Protocol"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="input-dark"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-text-secondary">Token Symbol *</label>
                <input
                  type="text"
                  placeholder="e.g. NXS"
                  value={form.symbol}
                  onChange={(e) => update('symbol', e.target.value)}
                  className="input-dark"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block text-xs text-text-secondary">Tagline</label>
              <input
                type="text"
                placeholder="A one-liner that captures your vision"
                value={form.tagline}
                onChange={(e) => update('tagline', e.target.value)}
                className="input-dark"
                maxLength={120}
              />
              <p className="mt-1 text-right text-[0.625rem] text-text-muted tabular-nums">
                {form.tagline.length}/120
              </p>
            </div>

            <div className="mt-4 grid gap-5 sm:grid-cols-[140px_1fr]">
              <div>
                <label className="mb-1.5 block text-xs text-text-secondary">Logo</label>
                <ImageUpload
                  value={logo.url}
                  onChange={(url, file) => setLogo({ url, file })}
                  label="Upload logo"
                  hint="Square, 400×400+"
                  aspectRatio="1/1"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-text-secondary">Cover Image</label>
                <ImageUpload
                  value={cover.url}
                  onChange={(url, file) => setCover({ url, file })}
                  label="Upload cover image"
                  hint="Recommended 1200×630"
                  aspectRatio="1200/630"
                />
              </div>
            </div>
          </section>

          {/* ──────────────── CAMPAIGN STORY ──────────────── */}
          <section id="section-story" className="panel p-6">
            <SectionHeader
              number="02"
              title="Campaign Story"
              subtitle="Describe your IP, the problem it solves, the team behind it, and why investors should care. Use headings, lists, and rich formatting to tell a compelling story."
            />

            <div className="mt-5">
              <label className="mb-1.5 block text-xs text-text-secondary">Description</label>
              <RichTextEditor
                content={description}
                onChange={setDescription}
                placeholder="Tell investors your story. What is the IP? Why does it matter? What's the plan?&#10;&#10;Use headings to structure your pitch: The Problem, The Solution, The Team, Tokenomics, Roadmap..."
              />
              <p className="mt-1.5 text-[0.625rem] text-text-muted">
                Tip: Structure with headings. Investors scan — make key points easy to find.
              </p>
            </div>
          </section>

          {/* ──────────────── MEDIA ──────────────── */}
          <section id="section-media" className="panel p-6">
            <SectionHeader
              number="03"
              title="Media & Visuals"
              subtitle="Images and video that showcase your IP. Campaigns with media raise 3× more on average."
            />

            <div className="mt-5">
              <label className="mb-1.5 block text-xs text-text-secondary">Video URL</label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="input-dark"
              />
              <p className="mt-1 text-[0.625rem] text-text-muted">YouTube or Vimeo link. Shown as embedded player on your campaign page.</p>
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-xs text-text-secondary">
                Image Gallery ({gallery.length}/6)
              </label>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                {gallery.map((img, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-lg border border-border">
                    <img src={img.url} alt={`Gallery ${i + 1}`} className="aspect-square w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-md bg-surface/80 text-negative opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {gallery.length < 6 && (
                  <ImageUpload
                    value={null}
                    onChange={(url, file) => addGalleryImage(url, file)}
                    label="Add image"
                    aspectRatio="1/1"
                  />
                )}
              </div>
            </div>
          </section>

          {/* ──────────────── SOCIAL LINKS ──────────────── */}
          <section id="section-social" className="panel p-6">
            <SectionHeader
              number="04"
              title="Social & Links"
              subtitle="Where can investors learn more and engage with your community?"
            />

            <div className="mt-5 space-y-3">
              {[
                { key: 'website', label: 'Website', placeholder: 'https://yourproject.com', icon: WebIcon },
                { key: 'twitter', label: 'X (Twitter)', placeholder: 'https://x.com/yourproject', icon: XIcon },
                { key: 'discord', label: 'Discord', placeholder: 'https://discord.gg/invite', icon: DiscordIcon },
                { key: 'telegram', label: 'Telegram', placeholder: 'https://t.me/yourproject', icon: TelegramIcon },
                { key: 'github', label: 'GitHub', placeholder: 'https://github.com/yourproject', icon: GithubIcon },
              ].map(({ key, label, placeholder, icon: Icon }) => (
                <div key={key} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.03] text-text-muted">
                    <Icon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <input
                      type="url"
                      placeholder={placeholder}
                      value={social[key as keyof typeof social]}
                      onChange={(e) => updateSocial(key, e.target.value)}
                      className="input-dark"
                      aria-label={label}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ──────────────── LEGAL DOCS ──────────────── */}
          <section id="section-legal" className="panel p-6">
            <SectionHeader
              number="05"
              title="Legal & Documentation"
              subtitle="Transparency builds trust. Upload documents that give investors confidence."
            />

            <div className="mt-5 space-y-3">
              <FileUpload
                value={whitepaper}
                onChange={setWhitepaper}
                label="Whitepaper"
                hint="Technical and business documentation (PDF)"
                accept=".pdf"
              />
              <FileUpload
                value={pitchDeck}
                onChange={setPitchDeck}
                label="Pitch Deck"
                hint="Presentation slides (PDF, PPT)"
                accept=".pdf,.ppt,.pptx"
              />
              <FileUpload
                value={terms}
                onChange={setTerms}
                label="Terms & Conditions"
                hint="Legal terms for campaign participation (PDF)"
                accept=".pdf,.doc,.docx"
              />
            </div>
          </section>

          {/* ──────────────── TOKEN PARAMETERS ──────────────── */}
          <section id="section-token" className="panel p-6">
            <SectionHeader
              number="06"
              title="Token Parameters"
              subtitle="Core economic parameters that define your token offering."
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs text-text-secondary">Token Price (ETH) *</label>
                <input
                  type="number"
                  step="0.0001"
                  min="0"
                  placeholder="0.01"
                  value={form.tokenPrice}
                  onChange={(e) => update('tokenPrice', e.target.value)}
                  className="input-dark tabular-nums"
                />
                <p className="mt-1 text-[0.625rem] text-text-muted">Price per token in ETH</p>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-text-secondary">Metadata URI</label>
                <input
                  type="text"
                  placeholder="ipfs://Qm..."
                  value={form.metadataURI}
                  onChange={(e) => update('metadataURI', e.target.value)}
                  className="input-dark font-mono text-xs"
                />
                <p className="mt-1 text-[0.625rem] text-text-muted">On-chain metadata pointer (optional)</p>
              </div>
              <div className="flex items-end">
                <div className="w-full rounded-lg bg-white/[0.025] p-3 text-center">
                  <p className="text-[0.625rem] text-text-muted">Accepted Asset</p>
                  <p className="mt-0.5 text-sm font-semibold">ETH</p>
                </div>
              </div>
            </div>
          </section>

          {/* ──────────────── RAISE PARAMETERS ──────────────── */}
          <section id="section-raise" className="panel p-6">
            <SectionHeader
              number="07"
              title="Fundraising Parameters"
              subtitle="Define your raise targets. Campaign succeeds if min raise is met; excess commitments get pro-rata refunds."
            />

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-text-secondary">Minimum Raise (ETH) *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="10"
                  value={form.minRaise}
                  onChange={(e) => update('minRaise', e.target.value)}
                  className="input-dark tabular-nums"
                />
                <p className="mt-1 text-[0.625rem] text-text-muted">Below this, all investors get full refunds</p>
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-text-secondary">Maximum Raise (ETH) *</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  placeholder="100"
                  value={form.maxRaise}
                  onChange={(e) => update('maxRaise', e.target.value)}
                  className="input-dark tabular-nums"
                />
                <p className="mt-1 text-[0.625rem] text-text-muted">Commitments above this get pro-rata allocation</p>
              </div>
            </div>

            {/* Raise summary */}
            {form.minRaise && form.maxRaise && form.tokenPrice && (
              <div className="mt-5 rounded-lg bg-white/[0.025] p-4">
                <p className="label-caps mb-2">Raise Summary</p>
                <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-[0.625rem] text-text-muted">Min Tokens Minted</p>
                    <p className="font-semibold tabular-nums">
                      {(parseFloat(form.minRaise) / parseFloat(form.tokenPrice)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] text-text-muted">Max Tokens Minted</p>
                    <p className="font-semibold tabular-nums">
                      {(parseFloat(form.maxRaise) / parseFloat(form.tokenPrice)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] text-text-muted">Min Raise</p>
                    <p className="font-semibold tabular-nums text-accent">{form.minRaise} ETH</p>
                  </div>
                  <div>
                    <p className="text-[0.625rem] text-text-muted">Max Raise</p>
                    <p className="font-semibold tabular-nums text-accent">{form.maxRaise} ETH</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* ──────────────── TIMELINE ──────────────── */}
          <section id="section-timeline" className="panel p-6">
            <SectionHeader
              number="08"
              title="Campaign Timeline"
              subtitle="When does your fundraise go live and when does it close? All times are in your local timezone."
            />

            <div className="mt-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-text-secondary">Campaign Start</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-1 block text-[0.625rem] text-text-muted">Date *</label>
                      <input
                        type="date"
                        value={form.startDate}
                        onChange={(e) => update('startDate', e.target.value)}
                        className="input-dark"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[0.625rem] text-text-muted">Time *</label>
                      <input
                        type="time"
                        value={form.startTime}
                        onChange={(e) => update('startTime', e.target.value)}
                        className="input-dark"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-medium text-text-secondary">Campaign End</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="mb-1 block text-[0.625rem] text-text-muted">Date *</label>
                      <input
                        type="date"
                        value={form.endDate}
                        onChange={(e) => update('endDate', e.target.value)}
                        className="input-dark"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-[0.625rem] text-text-muted">Time *</label>
                      <input
                        type="time"
                        value={form.endTime}
                        onChange={(e) => update('endTime', e.target.value)}
                        className="input-dark"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Duration display */}
              {form.startDate && form.startTime && form.endDate && form.endTime && (
                <div className="mt-4 flex items-center gap-3 rounded-lg bg-white/[0.025] px-4 py-2.5 text-sm">
                  <svg className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-text-secondary">
                    Duration:{' '}
                    <span className="font-medium text-text-primary">
                      {(() => {
                        const ms = new Date(`${form.endDate}T${form.endTime}`).getTime() - new Date(`${form.startDate}T${form.startTime}`).getTime()
                        if (ms <= 0) return 'Invalid (end must be after start)'
                        const days = Math.floor(ms / (1000 * 60 * 60 * 24))
                        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                        return `${days > 0 ? `${days}d ` : ''}${hours}h`
                      })()}
                    </span>
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* ──────────────── SUBMIT ──────────────── */}
          <section className="panel p-6">
            <div className="flex flex-col items-center text-center">
              <h3
                className="text-lg font-bold"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Ready to Launch?
              </h3>
              <p className="mt-1 max-w-md text-sm text-text-secondary">
                Your campaign will be submitted for admin review. Once approved, it goes live on the scheduled start date.
              </p>

              {!isConnected ? (
                <div className="mt-5 w-full max-w-sm">
                  <ConnectWalletPrompt message="Connect your company wallet to submit the campaign on-chain." />
                </div>
              ) : walletMismatch ? (
                <div className="mt-5 w-full max-w-sm rounded-xl border border-caution/20 bg-caution/5 p-4">
                  <p className="text-sm text-caution">
                    Wrong wallet connected. Please switch to your company wallet:
                  </p>
                  <p className="mt-1 font-mono text-xs text-text-muted">
                    {companyAuth?.walletAddress}
                  </p>
                </div>
              ) : (
                <div className="mt-5 w-full max-w-sm">
                  <TransactionButton
                    hash={hash}
                    isPending={isPending}
                    disabled={!isValid}
                    onClick={handleSubmit}
                  >
                    Create Campaign
                  </TransactionButton>
                </div>
              )}

              {!isValid && isConnected && !walletMismatch && (
                <p className="mt-3 text-xs text-text-muted">
                  Fill in all required fields (*) to enable submission.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

/* ── Section Header ── */

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-accent tabular-nums">{number}</span>
        <h2 className="text-base font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h2>
      </div>
      <p className="mt-1 text-sm leading-relaxed text-text-secondary">{subtitle}</p>
    </div>
  )
}

/* ── Social Icons ── */

function WebIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}
