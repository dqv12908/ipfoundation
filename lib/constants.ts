import type { Locale } from "./i18n";

/* ────────────────────────────────────────────
   Shared types
   ──────────────────────────────────────────── */

export interface HeroLine {
  text: string;
  outline: boolean;
}

interface NavContent {
  logo: string;
  links: { label: string; href: string }[];
  cta: string;
}

interface HeroContent {
  tagline: string;
  heroLines: HeroLine[];
  subheading: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { label: string; value: string }[];
}

interface ProblemCard {
  icon: "EyeOff" | "BarChart3" | "Unlink";
  title: string;
  description: string;
}

interface ProblemContent {
  sectionTitle: string;
  sectionSubtitle: string;
  cards: ProblemCard[];
}

interface SolutionPillar {
  icon: "ShoppingBag" | "ShieldCheck" | "Hexagon" | "Handshake";
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

interface SolutionContent {
  sectionTitle: string;
  sectionSubtitle: string;
  pillars: SolutionPillar[];
}

interface TokenWorksStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

interface TokenWorksContent {
  sectionTitle: string;
  sectionSubtitle: string;
  steps: TokenWorksStep[];
}

interface StakeholderTab {
  id: string;
  label: string;
  title: string;
  description: string;
  items: string[];
}

interface StakeholdersContent {
  sectionTitle: string;
  sectionSubtitle: string;
  tabs: StakeholderTab[];
}

interface BenefitItem {
  title: string;
  description: string;
}

interface BenefitsContent {
  sectionTitle: string;
  sectionSubtitle: string;
  learnMore: string;
  stats: { value: string; label: string }[];
  scientists: { title: string; items: BenefitItem[] };
  enterprises: { title: string; items: BenefitItem[] };
}

interface PartnershipModel {
  icon: "Upload" | "Network" | "Crown";
  title: string;
  subtitle: string;
  description: string;
  steps: string[];
}

interface PartnershipContent {
  sectionTitle: string;
  sectionSubtitle: string;
  models: PartnershipModel[];
}

interface RoadmapPhase {
  phase: string;
  title: string;
  status: "active" | "upcoming" | "future";
  items: string[];
}

interface RoadmapContent {
  sectionTitle: string;
  sectionSubtitle: string;
  phases: RoadmapPhase[];
}

interface LegalContent {
  items: string[];
}

interface ContactContent {
  sectionTitle: string;
  sectionSubtitle: string;
  infoTitle: string;
  info: { name: string; phone: string; email: string; website: string };
  form: {
    name: string;
    email: string;
    organization: string;
    partnershipType: string;
    partnershipOptions: string[];
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
  };
  validation: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
  };
}

interface FooterContent {
  tagline: string;
  columns: { title: string; links: { label: string; href: string }[] }[];
  copyright: string;
  legal: { label: string; href: string }[];
  badge: string;
}

export interface Content {
  NAV: NavContent;
  HERO: HeroContent;
  PROBLEM: ProblemContent;
  SOLUTION: SolutionContent;
  TOKEN_WORKS: TokenWorksContent;
  STAKEHOLDERS: StakeholdersContent;
  BENEFITS: BenefitsContent;
  PARTNERSHIP: PartnershipContent;
  ROADMAP: RoadmapContent;
  LEGAL: LegalContent;
  CONTACT: ContactContent;
  FOOTER: FooterContent;
}

/* ────────────────────────────────────────────
   Vietnamese
   ──────────────────────────────────────────── */

const vi: Content = {
  NAV: {
    logo: "IP FOUNDATION",
    links: [
      { label: "Giới thiệu", href: "#gioi-thieu" },
      { label: "Giải pháp", href: "#giai-phap" },
      { label: "Đối tác", href: "#doi-tac" },
      { label: "Lộ trình", href: "#lo-trinh" },
      { label: "Liên hệ", href: "#lien-he" },
    ],
    cta: "Bắt đầu ngay",
  },

  HERO: {
    tagline: "SỐ HÓA TÀI SẢN TRÍ TUỆ",
    heroLines: [
      { text: "SỐ HÓA", outline: false },
      { text: "TÀI SẢN", outline: true },
      { text: "TRÍ TUỆ", outline: false },
    ],
    subheading:
      "Nền tảng giao dịch & chuyển giao khoa học công nghệ theo mô hình IP & RWA",
    description:
      "IP Foundation kết nối nhà khoa học, doanh nghiệp và nhà đầu tư thông qua nền tảng token hóa tài sản trí tuệ — minh bạch, hiệu quả và tuân thủ pháp luật Việt Nam.",
    ctaPrimary: "Khám phá nền tảng",
    ctaSecondary: "Đăng ký sáng chế →",
    stats: [
      { label: "Công nghệ thí điểm", value: "10-20" },
      { label: "Token hóa RWA", value: "RWA" },
      { label: "Tuân thủ pháp luật VN", value: "100%" },
    ],
  },

  PROBLEM: {
    sectionTitle: "Bối cảnh & Vấn đề",
    sectionSubtitle:
      "Thị trường chuyển giao công nghệ tại Việt Nam đang đối mặt với nhiều thách thức lớn",
    cards: [
      {
        icon: "EyeOff",
        title: "Thiếu minh bạch",
        description:
          "Thông tin về sáng chế và quyền sở hữu trí tuệ không được công khai, gây khó khăn cho việc đánh giá và giao dịch.",
      },
      {
        icon: "BarChart3",
        title: "Khó định giá",
        description:
          "Chưa có phương pháp chuẩn hóa để định giá tài sản trí tuệ, dẫn đến rủi ro cao cho cả bên mua và bên bán.",
      },
      {
        icon: "Unlink",
        title: "Đứt gãy kết nối",
        description:
          "Nhà khoa học và doanh nghiệp thiếu kênh kết nối hiệu quả, nhiều công nghệ tốt không thể thương mại hóa.",
      },
    ],
  },

  SOLUTION: {
    sectionTitle: "Giải pháp — 4 Trụ Cột",
    sectionSubtitle:
      "Nền tảng IP Foundation được xây dựng trên 4 trụ cột công nghệ cốt lõi",
    pillars: [
      {
        icon: "ShoppingBag",
        title: "Marketplace",
        subtitle: "Sàn giao dịch IP",
        description:
          "Đăng và tìm kiếm sáng chế dễ dàng. Hệ thống phân loại thông minh giúp kết nối nhu cầu chính xác.",
        features: ["Đăng tải sáng chế", "Tìm kiếm thông minh", "Phân loại tự động"],
      },
      {
        icon: "ShieldCheck",
        title: "Thẩm định & Chuẩn hóa",
        subtitle: "Xác minh quyền sở hữu",
        description:
          "Xác minh quyền sở hữu IP, kiểm tra tranh chấp và chuẩn hóa tài liệu pháp lý tự động.",
        features: ["Xác minh quyền sở hữu", "Kiểm tra tranh chấp", "Chuẩn hóa pháp lý"],
      },
      {
        icon: "Hexagon",
        title: "Token hóa (RWA)",
        subtitle: "Chia nhỏ quyền sở hữu",
        description:
          "Chia nhỏ quyền sở hữu tài sản trí tuệ thành token, giúp huy động vốn dễ dàng và tăng thanh khoản.",
        features: ["Chia nhỏ quyền sở hữu", "Huy động vốn", "Tăng thanh khoản"],
      },
      {
        icon: "Handshake",
        title: "Giao dịch & Chuyển giao",
        subtitle: "Thị trường sơ/thứ cấp",
        description:
          "Thị trường sơ cấp và thứ cấp cho token IP. Hợp đồng số hóa, giao dịch minh bạch và an toàn.",
        features: ["Thị trường sơ cấp", "Thị trường thứ cấp", "Hợp đồng số hóa"],
      },
    ],
  },

  TOKEN_WORKS: {
    sectionTitle: "Token hóa Tài sản Trí tuệ",
    sectionSubtitle: "Quy trình chuyển đổi tài sản trí tuệ thành token số",
    steps: [
      {
        number: "01",
        title: "Đại diện Quyền lợi",
        description:
          "Mỗi token đại diện cho quyền sở hữu hoặc quyền hưởng doanh thu từ tài sản trí tuệ cụ thể.",
        detail: "Token = Quyền tài sản",
      },
      {
        number: "02",
        title: "Phân nhỏ Giá trị",
        description:
          "Tài sản trí tuệ có giá trị lớn được chia nhỏ thành nhiều phần đầu tư phù hợp với mọi quy mô.",
        detail: "1 IP → Nhiều token",
      },
      {
        number: "03",
        title: "Huy động Vốn",
        description:
          "Cộng đồng có thể đầu tư vào nghiên cứu và phát triển thông qua việc mua token IP.",
        detail: "Token → Vốn R&D",
      },
    ],
  },

  STAKEHOLDERS: {
    sectionTitle: "Đối tượng Tham gia",
    sectionSubtitle: "Hệ sinh thái kết nối đa bên trong chuyển giao công nghệ",
    tabs: [
      {
        id: "supply",
        label: "Bên Cung cấp",
        title: "Nhà cung cấp Công nghệ",
        description: "Những người sở hữu và phát triển tài sản trí tuệ",
        items: [
          "Viện nghiên cứu & Trường đại học",
          "Nhà khoa học độc lập",
          "Nhóm R&D doanh nghiệp",
          "Tổ chức sở hữu bằng sáng chế",
        ],
      },
      {
        id: "demand",
        label: "Bên Nhu cầu",
        title: "Bên tiếp nhận Công nghệ",
        description: "Những người cần ứng dụng công nghệ mới",
        items: [
          "Doanh nghiệp sản xuất",
          "Quỹ đầu tư mạo hiểm (VC)",
          "Nhà đầu tư cá nhân",
          "Startup công nghệ",
        ],
      },
      {
        id: "intermediary",
        label: "Trung gian & Hỗ trợ",
        title: "Đơn vị Hỗ trợ",
        description: "Các đối tác hỗ trợ quá trình chuyển giao",
        items: [
          "Tổ chức chuyển giao công nghệ",
          "Đơn vị thẩm định giá",
          "Tư vấn pháp lý IP",
          "Chuyên gia định giá",
        ],
      },
    ],
  },

  BENEFITS: {
    sectionTitle: "Lợi ích cho Đối tác",
    sectionSubtitle: "Giá trị thiết thực cho mọi bên tham gia hệ sinh thái",
    learnMore: "Tìm hiểu thêm",
    stats: [
      { value: "3x", label: "Tốc độ thương mại hóa" },
      { value: "60%", label: "Giảm chi phí R&D" },
      { value: "100%", label: "Minh bạch pháp lý" },
    ],
    scientists: {
      title: "Nhà khoa học & Nghiên cứu",
      items: [
        {
          title: "Thương mại hóa hiệu quả",
          description: "Đưa kết quả nghiên cứu ra thị trường nhanh chóng và hiệu quả hơn.",
        },
        {
          title: "Huy động vốn R&D trực tiếp",
          description: "Tiếp cận nguồn vốn đầu tư trực tiếp cho nghiên cứu và phát triển.",
        },
        {
          title: "Minh bạch quyền sở hữu",
          description: "Ghi nhận và bảo vệ quyền sở hữu trí tuệ trên blockchain.",
        },
      ],
    },
    enterprises: {
      title: "Doanh nghiệp",
      items: [
        {
          title: "Tiếp cận công nghệ nhanh",
          description: "Tìm kiếm và tiếp cận công nghệ phù hợp một cách nhanh chóng.",
        },
        {
          title: "Giảm chi phí & rủi ro R&D",
          description: "Tiết kiệm thời gian và chi phí nghiên cứu phát triển nội bộ.",
        },
        {
          title: "Quyền khai thác rõ ràng",
          description: "Hợp đồng số hóa đảm bảo quyền khai thác pháp lý minh bạch.",
        },
      ],
    },
  },

  PARTNERSHIP: {
    sectionTitle: "Mô hình Hợp tác",
    sectionSubtitle: "Đa dạng hình thức hợp tác, phù hợp với mọi đối tác",
    models: [
      {
        icon: "Upload",
        title: "IP Provider",
        subtitle: "Nhà cung cấp IP",
        description:
          "Đăng tải tài sản trí tuệ, phối hợp thẩm định và chia sẻ doanh thu từ việc token hóa.",
        steps: ["Đăng tải IP", "Phối hợp thẩm định", "Chia sẻ doanh thu"],
      },
      {
        icon: "Network",
        title: "Transfer Partner",
        subtitle: "Đối tác Chuyển giao",
        description:
          "Kết nối doanh nghiệp, đồng tổ chức thương mại hóa và hưởng phí trung gian.",
        steps: ["Kết nối doanh nghiệp", "Đồng tổ chức", "Phí trung gian"],
      },
      {
        icon: "Crown",
        title: "Strategic Partner",
        subtitle: "Đối tác Chiến lược",
        description:
          "Phát triển nền tảng, đồng thương hiệu và mở rộng thị trường quốc tế.",
        steps: ["Phát triển nền tảng", "Đồng thương hiệu", "Mở rộng quốc tế"],
      },
    ],
  },

  ROADMAP: {
    sectionTitle: "Lộ trình Triển khai",
    sectionSubtitle: "Chiến lược phát triển từ thị trường nội địa đến quốc tế",
    phases: [
      {
        phase: "Giai đoạn 1",
        title: "Thị trường Việt Nam",
        status: "active",
        items: [
          "Thí điểm 10-20 công nghệ",
          "Token hóa thị trường sơ cấp",
          "Xây dựng cộng đồng",
          "Hoàn thiện pháp lý",
        ],
      },
      {
        phase: "Giai đoạn 2",
        title: "Mở rộng & Tích hợp",
        status: "upcoming",
        items: [
          "Thị trường thứ cấp",
          "Đa ngành nghề",
          "Tích hợp DeFi",
          "Mở rộng đối tác",
        ],
      },
      {
        phase: "Giai đoạn 3",
        title: "Vươn tầm Quốc tế",
        status: "future",
        items: [
          "Kết nối thị trường toàn cầu",
          "Multi-chain, multi-currency",
          "Hợp tác quốc tế",
          "Tiêu chuẩn toàn cầu",
        ],
      },
    ],
  },

  LEGAL: {
    items: [
      "Token đại diện quyền tài sản (không phải tiền/chứng khoán)",
      "Tuân thủ pháp luật Việt Nam",
      "Hướng tới Sandbox pháp lý",
    ],
  },

  CONTACT: {
    sectionTitle: "Đề xuất Hợp tác",
    sectionSubtitle:
      "Hãy liên hệ với chúng tôi để cùng xây dựng hệ sinh thái IP Foundation",
    infoTitle: "Thông tin Liên hệ",
    info: {
      name: "Trần Lý Huỳnh",
      phone: "0968 813 228",
      email: "contact@ip-foundation.com",
      website: "IP-foundation.com",
    },
    form: {
      name: "Họ và tên",
      email: "Email",
      organization: "Tổ chức",
      partnershipType: "Loại hợp tác",
      partnershipOptions: [
        "IP Provider",
        "Transfer Partner",
        "Strategic Partner",
        "Nhà đầu tư",
        "Khác",
      ],
      message: "Tin nhắn",
      submit: "Gửi đề xuất",
      sending: "Đang gửi...",
      success: "Đã gửi thành công! Chúng tôi sẽ liên hệ lại sớm.",
      error: "Có lỗi xảy ra. Vui lòng thử lại.",
    },
    validation: {
      nameRequired: "Vui lòng nhập họ tên",
      emailRequired: "Vui lòng nhập email",
      emailInvalid: "Email không hợp lệ",
      messageRequired: "Vui lòng nhập tin nhắn",
    },
  },

  FOOTER: {
    tagline: "Nền tảng Số hóa Tài sản Trí tuệ",
    columns: [
      {
        title: "Nền tảng",
        links: [
          { label: "Marketplace", href: "#giai-phap" },
          { label: "Token hóa", href: "#giai-phap" },
          { label: "Thẩm định", href: "#giai-phap" },
        ],
      },
      {
        title: "Hợp tác",
        links: [
          { label: "IP Provider", href: "#doi-tac" },
          { label: "Transfer Partner", href: "#doi-tac" },
          { label: "Strategic Partner", href: "#doi-tac" },
        ],
      },
      {
        title: "Liên hệ",
        links: [
          { label: "contact@ip-foundation.com", href: "mailto:contact@ip-foundation.com" },
          { label: "0968 813 228", href: "tel:+84968813228" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} IP Foundation. All rights reserved.`,
    legal: [
      { label: "Chính sách bảo mật", href: "#" },
      { label: "Điều khoản sử dụng", href: "#" },
    ],
    badge: "Powered by blockchain technology",
  },
};

/* ────────────────────────────────────────────
   English
   ──────────────────────────────────────────── */

const en: Content = {
  NAV: {
    logo: "IP FOUNDATION",
    links: [
      { label: "About", href: "#gioi-thieu" },
      { label: "Solutions", href: "#giai-phap" },
      { label: "Partners", href: "#doi-tac" },
      { label: "Roadmap", href: "#lo-trinh" },
      { label: "Contact", href: "#lien-he" },
    ],
    cta: "Get Started",
  },

  HERO: {
    tagline: "DIGITIZE INTELLECTUAL PROPERTY",
    heroLines: [
      { text: "DIGITIZE", outline: false },
      { text: "INTELLECTUAL", outline: true },
      { text: "PROPERTY", outline: false },
    ],
    subheading:
      "Platform for science & technology trading and transfer using IP & RWA tokenization",
    description:
      "IP Foundation connects scientists, enterprises, and investors through an intellectual property tokenization platform — transparent, efficient, and compliant with Vietnamese law.",
    ctaPrimary: "Explore Platform",
    ctaSecondary: "Register Patent →",
    stats: [
      { label: "Pilot Technologies", value: "10-20" },
      { label: "RWA Tokenization", value: "RWA" },
      { label: "VN Legal Compliance", value: "100%" },
    ],
  },

  PROBLEM: {
    sectionTitle: "Context & Challenges",
    sectionSubtitle:
      "Vietnam's technology transfer market faces significant challenges",
    cards: [
      {
        icon: "EyeOff",
        title: "Lack of Transparency",
        description:
          "Patent and IP ownership information is not publicly accessible, making evaluation and transactions difficult.",
      },
      {
        icon: "BarChart3",
        title: "Valuation Difficulties",
        description:
          "No standardized method exists for valuing intellectual property, leading to high risk for both buyers and sellers.",
      },
      {
        icon: "Unlink",
        title: "Broken Connections",
        description:
          "Scientists and enterprises lack effective channels to connect, leaving many good technologies uncommercialized.",
      },
    ],
  },

  SOLUTION: {
    sectionTitle: "Solutions — 4 Pillars",
    sectionSubtitle:
      "The IP Foundation platform is built on 4 core technology pillars",
    pillars: [
      {
        icon: "ShoppingBag",
        title: "Marketplace",
        subtitle: "IP Exchange",
        description:
          "Easily list and search patents. A smart classification system accurately matches supply with demand.",
        features: ["List Patents", "Smart Search", "Auto Classification"],
      },
      {
        icon: "ShieldCheck",
        title: "Verification & Standardization",
        subtitle: "Ownership Verification",
        description:
          "Verify IP ownership, check for disputes, and automatically standardize legal documentation.",
        features: ["Ownership Verification", "Dispute Check", "Legal Standardization"],
      },
      {
        icon: "Hexagon",
        title: "Tokenization (RWA)",
        subtitle: "Fractional Ownership",
        description:
          "Fractionalize IP ownership into tokens, enabling easy fundraising and increased liquidity.",
        features: ["Fractional Ownership", "Fundraising", "Increase Liquidity"],
      },
      {
        icon: "Handshake",
        title: "Trading & Transfer",
        subtitle: "Primary / Secondary Market",
        description:
          "Primary and secondary markets for IP tokens. Digitized contracts ensure transparent and secure trading.",
        features: ["Primary Market", "Secondary Market", "Digital Contracts"],
      },
    ],
  },

  TOKEN_WORKS: {
    sectionTitle: "IP Asset Tokenization",
    sectionSubtitle: "The process of converting intellectual property into digital tokens",
    steps: [
      {
        number: "01",
        title: "Represent Rights",
        description:
          "Each token represents ownership or revenue rights tied to a specific intellectual property asset.",
        detail: "Token = Property Rights",
      },
      {
        number: "02",
        title: "Fractionalize Value",
        description:
          "High-value intellectual property is divided into smaller investment portions suitable for any scale.",
        detail: "1 IP → Multiple Tokens",
      },
      {
        number: "03",
        title: "Raise Capital",
        description:
          "The community can invest in research and development by purchasing IP tokens.",
        detail: "Token → R&D Capital",
      },
    ],
  },

  STAKEHOLDERS: {
    sectionTitle: "Participants",
    sectionSubtitle: "A multi-party ecosystem connecting technology transfer stakeholders",
    tabs: [
      {
        id: "supply",
        label: "Supply Side",
        title: "Technology Providers",
        description: "Those who own and develop intellectual property",
        items: [
          "Research Institutes & Universities",
          "Independent Scientists",
          "Corporate R&D Teams",
          "Patent-Holding Organizations",
        ],
      },
      {
        id: "demand",
        label: "Demand Side",
        title: "Technology Adopters",
        description: "Those who need to apply new technologies",
        items: [
          "Manufacturing Enterprises",
          "Venture Capital Funds (VC)",
          "Individual Investors",
          "Tech Startups",
        ],
      },
      {
        id: "intermediary",
        label: "Intermediaries & Support",
        title: "Support Organizations",
        description: "Partners that facilitate the transfer process",
        items: [
          "Technology Transfer Organizations",
          "Valuation Firms",
          "IP Legal Consultants",
          "Valuation Experts",
        ],
      },
    ],
  },

  BENEFITS: {
    sectionTitle: "Partner Benefits",
    sectionSubtitle: "Tangible value for every participant in the ecosystem",
    learnMore: "Learn more",
    stats: [
      { value: "3x", label: "Commercialization Speed" },
      { value: "60%", label: "R&D Cost Reduction" },
      { value: "100%", label: "Legal Transparency" },
    ],
    scientists: {
      title: "Scientists & Researchers",
      items: [
        {
          title: "Effective Commercialization",
          description: "Bring research results to market faster and more efficiently.",
        },
        {
          title: "Direct R&D Funding",
          description: "Access direct investment capital for research and development.",
        },
        {
          title: "Transparent Ownership",
          description: "Record and protect intellectual property rights on blockchain.",
        },
      ],
    },
    enterprises: {
      title: "Enterprises",
      items: [
        {
          title: "Rapid Tech Access",
          description: "Quickly find and access suitable technologies.",
        },
        {
          title: "Reduce R&D Cost & Risk",
          description: "Save time and reduce internal research and development expenses.",
        },
        {
          title: "Clear Exploitation Rights",
          description: "Digitized contracts ensure transparent legal exploitation rights.",
        },
      ],
    },
  },

  PARTNERSHIP: {
    sectionTitle: "Partnership Models",
    sectionSubtitle: "Diverse partnership formats suitable for every type of partner",
    models: [
      {
        icon: "Upload",
        title: "IP Provider",
        subtitle: "IP Provider",
        description:
          "List intellectual property, coordinate appraisals, and share revenue from tokenization.",
        steps: ["List IP", "Coordinate Appraisal", "Share Revenue"],
      },
      {
        icon: "Network",
        title: "Transfer Partner",
        subtitle: "Transfer Partner",
        description:
          "Connect enterprises, co-organize commercialization, and earn intermediary fees.",
        steps: ["Connect Enterprises", "Co-organize", "Intermediary Fees"],
      },
      {
        icon: "Crown",
        title: "Strategic Partner",
        subtitle: "Strategic Partner",
        description:
          "Platform development, co-branding, and international market expansion.",
        steps: ["Platform Development", "Co-branding", "Global Expansion"],
      },
    ],
  },

  ROADMAP: {
    sectionTitle: "Implementation Roadmap",
    sectionSubtitle: "Development strategy from domestic to international markets",
    phases: [
      {
        phase: "Phase 1",
        title: "Vietnam Market",
        status: "active",
        items: [
          "Pilot 10–20 technologies",
          "Primary market tokenization",
          "Build community",
          "Finalize legal framework",
        ],
      },
      {
        phase: "Phase 2",
        title: "Expansion & Integration",
        status: "upcoming",
        items: [
          "Secondary market",
          "Multi-industry expansion",
          "DeFi integration",
          "Expand partnerships",
        ],
      },
      {
        phase: "Phase 3",
        title: "Going Global",
        status: "future",
        items: [
          "Connect to global markets",
          "Multi-chain, multi-currency",
          "International partnerships",
          "Global standards",
        ],
      },
    ],
  },

  LEGAL: {
    items: [
      "Tokens represent property rights (not currency or securities)",
      "Compliant with Vietnamese law",
      "Targeting legal Sandbox framework",
    ],
  },

  CONTACT: {
    sectionTitle: "Partnership Proposal",
    sectionSubtitle:
      "Contact us to build the IP Foundation ecosystem together",
    infoTitle: "Contact Information",
    info: {
      name: "Trần Lý Huỳnh",
      phone: "0968 813 228",
      email: "contact@ip-foundation.com",
      website: "IP-foundation.com",
    },
    form: {
      name: "Full Name",
      email: "Email",
      organization: "Organization",
      partnershipType: "Partnership Type",
      partnershipOptions: [
        "IP Provider",
        "Transfer Partner",
        "Strategic Partner",
        "Investor",
        "Other",
      ],
      message: "Message",
      submit: "Submit Proposal",
      sending: "Sending...",
      success: "Sent successfully! We'll get back to you soon.",
      error: "An error occurred. Please try again.",
    },
    validation: {
      nameRequired: "Please enter your name",
      emailRequired: "Please enter your email",
      emailInvalid: "Invalid email address",
      messageRequired: "Please enter a message",
    },
  },

  FOOTER: {
    tagline: "Intellectual Property Digitization Platform",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "Marketplace", href: "#giai-phap" },
          { label: "Tokenization", href: "#giai-phap" },
          { label: "Verification", href: "#giai-phap" },
        ],
      },
      {
        title: "Partnership",
        links: [
          { label: "IP Provider", href: "#doi-tac" },
          { label: "Transfer Partner", href: "#doi-tac" },
          { label: "Strategic Partner", href: "#doi-tac" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "contact@ip-foundation.com", href: "mailto:contact@ip-foundation.com" },
          { label: "0968 813 228", href: "tel:+84968813228" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} IP Foundation. All rights reserved.`,
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
    badge: "Powered by blockchain technology",
  },
};

/* ────────────────────────────────────────────
   Accessor
   ──────────────────────────────────────────── */

const translations: Record<Locale, Content> = { vi, en };

export function getContent(locale: Locale): Content {
  return translations[locale];
}

/* ────────────────────────────────────────────
   Backward-compatible named exports (Vietnamese)
   so files that haven't migrated yet still work.
   ──────────────────────────────────────────── */

export const NAV = vi.NAV;
export const HERO = vi.HERO;
export const PROBLEM = vi.PROBLEM;
export const SOLUTION = vi.SOLUTION;
export const TOKEN_WORKS = vi.TOKEN_WORKS;
export const STAKEHOLDERS = vi.STAKEHOLDERS;
export const BENEFITS = vi.BENEFITS;
export const PARTNERSHIP = vi.PARTNERSHIP;
export const ROADMAP = vi.ROADMAP;
export const LEGAL = vi.LEGAL;
export const CONTACT = vi.CONTACT;
export const FOOTER = vi.FOOTER;
