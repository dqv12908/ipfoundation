 # IP Foundation Website - Neo-3D Style

 ## Project Overview
 Build a modern, immersive website for IP Foundation - a Vietnamese startup creating a platform for intellectual property (IP) and technology transfer using RWA (Real World Asset) tokenization. The website should showcase cutting-edge Web3/blockchain visual language while maintaining professional credibility for academic and enterprise audiences.

 ## Tech Stack
 - **Framework:** Next.js 14 (App Router)
 - **Styling:** Tailwind CSS + CSS custom properties for theme
 - **3D/Animations:** Three.js with React Three Fiber + Drei helpers
 - **Micro-animations:** Framer Motion
 - **Icons:** Lucide React
 - **Fonts:** Inter (body) + Space Grotesk (headings)
 - **Language:** TypeScript

 ## Design System

 ### Colors (CSS Variables)
 ```css
 --color-bg-primary: #0A1628;
 --color-bg-secondary: #111D2E;
 --color-bg-card: rgba(17, 29, 46, 0.8);
 --color-accent-cyan: #00D4FF;
 --color-accent-gold: #FFB800;
 --color-accent-mint: #00FFA3;
 --color-text-primary: #FFFFFF;
 --color-text-secondary: #94A3B8;
 --color-border: rgba(148, 163, 184, 0.1);
 ```

 ### Typography
 - Headings: Space Grotesk, weights 500-700
 - Body: Inter, weights 400-500
 - Vietnamese language support required

 ### 3D Style Guidelines (Neo-3D / Soft 3D)
 - All 3D objects should have:
   - Rounded, inflated geometry (no sharp edges)
   - Soft gradients (cyan → navy, gold → orange)
   - Subtle ambient occlusion shadows
   - Glass/translucent materials where appropriate
   - Gentle floating animations (y-axis oscillation, slow rotation)
 - Performance: Use instancing, LOD, and lazy loading for 3D scenes
 - Fallback: Show static gradient images if WebGL not supported

 ## Page Structure

 ### 1. Navigation (Sticky, glass morphism)
 - Logo (left): "IP" icon with soft 3D effect + "FOUNDATION" text
 - Menu items (center): Giới thiệu | Giải pháp | Đối tác | Lộ trình | Liên hệ
 - CTA button (right): "Bắt đầu ngay" with glow effect
 - Mobile: Hamburger menu with full-screen overlay

 ### 2. Hero Section
 **Layout:** Full viewport height, split layout
 **Left side (50%):**
 - Tagline: "SỐ HÓA TÀI SẢN TRÍ TUỆ" (large, gradient text cyan→white)
 - Subheading: "Nền tảng giao dịch & chuyển giao khoa học công nghệ theo mô hình IP & RWA"
 - Description paragraph (2-3 lines about the platform)
 - Two CTAs: 
   - Primary: "Khám phá nền tảng" (cyan, glowing)
   - Secondary: "Đăng ký sáng chế →" (outline)
 - Stats row: "10-20 công nghệ thí điểm" | "Token hóa RWA" | "Tuân thủ pháp luật VN"

 **Right side (50%):** 3D Scene
 - Central element: Animated document/patent transforming into glowing token particles
 - Surrounding elements: Floating 3D icons (flask, lightbulb, coin, handshake)
 - Particle system connecting elements
 - Soft glow effects and ambient lighting

 ### 3. Problem Section ("Bối cảnh & Vấn đề")
 **Layout:** Two-column comparison with 3D visualization
 **Content:**
 - Section title with accent underline
 - Three problem cards (glass morphism):
   1. "Thiếu minh bạch" - Eye-slash icon
   2. "Khó định giá" - Chart icon
   3. "Đứt gãy kết nối" - Unlink icon
 - Each card has soft 3D icon, title, description
 - 3D illustration: Disconnected, chaotic floating elements

 ### 4. Solution Section ("Giải pháp - 4 Trụ Cột")
 **Layout:** Horizontal scroll or grid of 4 interactive cards
 **Four Pillars (each as 3D card):**
 1. **Marketplace** - Shopping bag 3D icon
    - "Đăng & tìm kiếm sáng chế, Phân loại thông minh"
 2. **Thẩm định & Chuẩn hóa** - Shield check 3D icon
    - "Xác minh quyền sở hữu IP, kiểm tra tranh chấp"
 3. **Token hóa (RWA)** - Hexagon/token 3D icon
    - "Chia nhỏ quyền sở hữu, huy động vốn dễ dàng"
 4. **Giao dịch & Chuyển giao** - Handshake 3D icon
    - "Thị trường sơ/thứ cấp, hợp đồng số hóa"

 **Interaction:** Hover reveals detailed description, card lifts with shadow

 ### 5. How Token Works Section ("Token hóa Tài sản Trí tuệ")
 **Layout:** Horizontal storytelling with scroll-triggered animations
 **Three steps:**
 1. "Đại diện Quyền lợi" - Token represents ownership/revenue rights
 2. "Phân nhỏ Giá trị" - Large value split into investable pieces
 3. "Huy động Vốn" - Community funding for R&D

 **3D Scene:** Animated flow showing document → fragmentation → multiple tokens → distribution

 ### 6. Stakeholders Section ("Đối tượng Tham gia")
 **Layout:** Three-tab interface with 3D scenes
 **Tabs:**
 1. **Bên Cung cấp (Supply):** Research institutes, independent scientists, R&D groups
 2. **Bên Nhu cầu (Demand):** Enterprises, VCs, individual investors
 3. **Trung gian & Hỗ trợ:** Tech transfer orgs, valuation units, legal consultants

 Each tab shows relevant 3D scene and benefit list

 ### 7. Benefits Section ("Lợi ích cho Đối tác")
 **Layout:** Two-column cards
 **For Scientists/Research:**
 - Commercialize research effectively
 - Direct R&D funding
 - Transparent IP ownership

 **For Enterprises:**
 - Quick access to suitable technology
 - Reduce R&D cost and risk
 - Clear legal exploitation rights

 ### 8. Partnership Models Section ("Mô hình Hợp tác")
 **Layout:** Three cards in a row
 1. **IP Provider** - Upload icon
    - List IP, coordinate appraisal, share revenue
 2. **Transfer Partner** - Network icon
    - Connect enterprises, co-organize commercialization
 3. **Strategic Partner** - Crown icon
    - Platform development, branding, global expansion

 ### 9. Roadmap Section ("Lộ trình Triển khai")
 **Layout:** Horizontal timeline with 3D floating islands
 **Phases:**
 1. **Giai đoạn 1: Thị trường Việt Nam**
    - Pilot 10-20 technologies
    - Primary market tokenization
 2. **Giai đoạn 2: Mở rộng & Tích hợp**
    - Secondary market
    - Multi-industry expansion
 3. **Giai đoạn 3: Vươn tầm Quốc tế**
    - Global market connection
    - Multi-chain, multi-currency support

 **3D:** Connected floating islands/platforms representing each phase

 ### 10. Legal Compliance Banner
 **Layout:** Highlighted banner section
 **Content:** "Token đại diện quyền tài sản (không phải tiền/chứng khoán) • Tuân thủ pháp luật Việt Nam • Hướng tới Sandbox"
 **Style:** Subtle gold accent, trust badge icons

 ### 11. CTA / Contact Section
 **Layout:** Split - left info, right form
 **Left:**
 - "Đề xuất Hợp tác"
 - Partnership invitation text
 - Contact info:
   - Trần Lý Huỳnh
   - 0968 813 228
   - contact@ip-foundation.com
   - IP-foundation.com

 **Right:** Contact form
 - Name, Email, Organization, Partnership Type dropdown, Message
 - Submit button with loading state

 ### 12. Footer
 - Logo + tagline
 - Quick links
 - Social links
 - Copyright + legal links
 - "Powered by blockchain technology" badge

 ## Component Requirements

 ### Reusable Components
 1. `GlassCard` - Glass morphism card with hover effects
 2. `GradientText` - Text with cyan-to-white gradient
 3. `GlowButton` - CTA button with glow animation
 4. `SectionTitle` - Consistent section heading with accent
 5. `Float3DScene` - Wrapper for Three.js canvas with loading state
 6. `AnimatedCounter` - Number animation for stats
 7. `IconBox` - 3D-style icon container

 ### 3D Components (React Three Fiber)
 1. `HeroScene` - Main hero 3D visualization
 2. `FloatingIcon` - Reusable animated 3D icon
 3. `TokenParticles` - Particle system for token visualization
 4. `RoadmapIslands` - Connected floating platforms

 ## Animation Guidelines
 - Use Framer Motion for:
   - Scroll-triggered reveals (fade up, scale in)
   - Stagger animations for lists
   - Hover states on cards
   - Page transitions

 - Three.js animations:
   - Gentle floating (sin wave on Y axis)
   - Slow rotation on hover
   - Particle flow between elements
   - Glow pulse effects

 ## Performance Requirements
 - Lighthouse score > 80 for all metrics
 - Lazy load 3D scenes below fold
 - Use `Suspense` with skeleton loaders
 - Optimize 3D models (< 500KB total)
 - Implement reduced motion media query support

 ## Responsive Breakpoints
 - Mobile: < 768px (stack layouts, simplified 3D)
 - Tablet: 768px - 1024px
 - Desktop: > 1024px

 ## SEO Requirements
 - Vietnamese language meta tags
 - Open Graph tags for social sharing
 - Structured data for organization
 - Semantic HTML throughout

 ## File Structure
 /app
 /page.tsx (main landing page)
 /layout.tsx
 /globals.css
 /components
 /ui (reusable UI components)
 /sections (page sections)
 /3d (Three.js components)
 /lib
 /utils.ts
 /constants.ts
 /public
 /fonts
 /images
 /models (3D assets if any)

 ## Deliverables
 1. Fully functional Next.js application
 2. All sections as described above
 3. Responsive design for all breakpoints
 4. 3D visualizations with fallbacks
 5. Contact form with validation
 6. Smooth scroll navigation
 7. Loading states and animations

 Build this step by step:
 1. First set up the project structure and design system
 2. Create reusable UI components
 3. Build each section from top to bottom
 4. Add 3D scenes progressively
 5. Implement animations and interactions
 6. Test responsiveness and performance
 7. Add final polish and optimizations

 tạo 1 file content.md và đưa toàn bộ nội dung này vào
