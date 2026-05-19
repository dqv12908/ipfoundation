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
    tagline: "MÃ HÓA SÁNG CHẾ & PHÁT MINH",
    heroLines: [
      { text: "MÃ HÓA", outline: false },
      { text: "SÁNG CHẾ", outline: true },
      { text: "KHOA HỌC", outline: false },
    ],
    subheading:
      "Nền tảng mã hóa sáng chế & phát minh khoa học công nghệ theo mô hình RWA",
    description:
      "IP Foundation kết nối tài sản trí tuệ với nguồn vốn để đẩy nhanh quá trình hình thành prototype, chia sẻ rủi ro và tăng tỉ lệ thương mại hóa cho sáng chế & phát minh.",
    ctaPrimary: "Mở Launchpad",
    ctaSecondary: "Đưa IP lên nền tảng →",
    stats: [
      { label: "Huy động vốn sớm", value: "R&D" },
      { label: "Mã hóa RWA", value: "RWA" },
      { label: "Chia sẻ rủi ro", value: "Token" },
    ],
  },

  PROBLEM: {
    sectionTitle: "Bối cảnh & Vấn đề",
    sectionSubtitle:
      "Tỉ lệ thương mại hóa IP trên thế giới còn thấp; tại Việt Nam, khoảng cách từ nghiên cứu đến sản phẩm mẫu còn lớn hơn",
    cards: [
      {
        icon: "EyeOff",
        title: "Khoảng cách nghiên cứu - thị trường",
        description:
          "Thiếu nền tảng kết nối tài chính để các kết quả nghiên cứu tiến gần hơn tới prototype, kiểm định và nhu cầu thị trường.",
      },
      {
        icon: "BarChart3",
        title: "Thiếu dòng vốn & rào cản tài chính",
        description:
          "Giai đoạn làm sản phẩm mẫu, kiểm định và sản xuất thử cần vốn lớn nhưng chưa tạo doanh thu, trong khi vốn mạo hiểm thường ưu tiên mô hình đã có traction.",
      },
      {
        icon: "Unlink",
        title: "Khó định giá và thiếu thanh khoản",
        description:
          "Tài sản trí tuệ khó định giá và khó dùng làm tài sản thế chấp truyền thống, khiến ngân hàng, quỹ và tổ chức tài chính ít tham gia.",
      },
    ],
  },

  SOLUTION: {
    sectionTitle: "Giải pháp — 4 Trụ Cột",
    sectionSubtitle:
      "IP Foundation chuẩn hóa tài sản trí tuệ, mã hóa quyền lợi kinh tế và mở thị trường vốn cho cộng đồng",
    pillars: [
      {
        icon: "ShieldCheck",
        title: "Thẩm định & Chuẩn hóa",
        subtitle: "Xác minh quyền sở hữu",
        description:
          "Xác minh quyền sở hữu IP, kiểm tra tranh chấp, chuẩn hóa hồ sơ pháp lý và dữ liệu kỹ thuật trước khi đưa tài sản lên nền tảng.",
        features: ["Xác minh quyền sở hữu", "Chuẩn hóa hồ sơ IP", "Kiểm tra tranh chấp"],
      },
      {
        icon: "Hexagon",
        title: "Mã hóa RWA",
        subtitle: "Chia nhỏ quyền lợi kinh tế",
        description:
          "Chia nhỏ quyền lợi kinh tế của tài sản trí tuệ thành token để nhiều nhà đầu tư cùng tham gia, phân tán rủi ro và mở dòng vốn toàn cầu.",
        features: ["Token hóa quyền lợi kinh tế", "Chia nhỏ rủi ro", "Tiếp cận nhà đầu tư rộng hơn"],
      },
      {
        icon: "ShoppingBag",
        title: "Launchpad",
        subtitle: "Thị trường giao dịch sơ cấp",
        description:
          "Huy động vốn sớm cho tài sản trí tuệ, giúp cộng đồng đầu tư vào giai đoạn prototype, kiểm định và sản xuất thử nghiệm.",
        features: ["Huy động vốn sơ cấp", "Cộng đồng cùng tài trợ", "Chia sẻ rủi ro R&D"],
      },
      {
        icon: "Handshake",
        title: "DEX",
        subtitle: "Thị trường giao dịch thứ cấp",
        description:
          "Tạo thanh khoản 24/7 cho token IP, giúp thị trường hình thành giá tham chiếu và mở đường cho giao dịch thứ cấp minh bạch.",
        features: ["Giao dịch 24/7", "Tăng thanh khoản", "Tạo giá thị trường cho IP"],
      },
    ],
  },

  TOKEN_WORKS: {
    sectionTitle: "Token IP hoạt động như thế nào",
    sectionSubtitle: "Mỗi token đại diện cho lợi ích kinh tế của một tài sản trí tuệ cụ thể",
    steps: [
      {
        number: "01",
        title: "Đại diện Lợi ích Kinh tế",
        description:
          "Mỗi token đại diện cho quyền lợi kinh tế gắn với một tài sản trí tuệ đã được thẩm định và chuẩn hóa.",
        detail: "Token = Lợi ích kinh tế",
      },
      {
        number: "02",
        title: "Phân nhỏ Giá trị & Rủi ro",
        description:
          "Tài sản trí tuệ có giá trị lớn được chia nhỏ thành nhiều phần đầu tư phù hợp với mọi quy mô, đồng thời chia sẻ rủi ro cho cộng đồng.",
        detail: "1 IP → Nhiều nhà đầu tư",
      },
      {
        number: "03",
        title: "Huy động Vốn",
        description:
          "Cộng đồng có thể đầu tư vào tài sản trí tuệ thông qua việc mua token IP trên thị trường sơ cấp.",
        detail: "Token → Vốn prototype",
      },
      {
        number: "04",
        title: "Tạo Thanh khoản",
        description:
          "Sau giai đoạn sơ cấp, nhà đầu tư có thể giao dịch 24/7 trên thị trường thứ cấp để tăng thanh khoản cho token IP.",
        detail: "DEX → Thanh khoản IP",
      },
    ],
  },

  STAKEHOLDERS: {
    sectionTitle: "Đối tượng Tham gia",
    sectionSubtitle: "Hệ sinh thái kết nối chủ sở hữu IP, cộng đồng đầu tư và các đối tác thẩm định",
    tabs: [
      {
        id: "supply",
        label: "Chủ sở hữu IP",
        title: "Sở hữu Tài sản Trí tuệ",
        description: "Những người sở hữu sáng chế, phát minh và kết quả nghiên cứu cần vốn để thương mại hóa",
        items: [
          "Viện nghiên cứu & Trường đại học",
          "Nhà khoa học độc lập",
          "Nhóm R&D doanh nghiệp",
          "Tổ chức sở hữu sáng chế & giải pháp hữu ích",
        ],
      },
      {
        id: "demand",
        label: "Nhà đầu tư",
        title: "Cộng đồng Đầu tư",
        description: "Những người muốn tham gia sớm vào tài sản trí tuệ có tiềm năng thông qua token",
        items: [
          "Nhà đầu tư cá nhân",
          "Quỹ đầu tư mạo hiểm (VC)",
          "Doanh nghiệp tìm kiếm công nghệ mới",
          "Cộng đồng Web3 & RWA",
        ],
      },
      {
        id: "intermediary",
        label: "Thẩm định & Hỗ trợ",
        title: "Đơn vị Thẩm định, Pháp lý và Triển khai",
        description: "Các đối tác hỗ trợ định giá, chuẩn hóa, bảo vệ và đưa tài sản trí tuệ ra thị trường",
        items: [
          "Tổ chức chuyển giao công nghệ",
          "Đơn vị thẩm định giá",
          "Tư vấn pháp lý IP",
          "Đối tác sản xuất thử nghiệm & thương mại hóa",
        ],
      },
    ],
  },

  BENEFITS: {
    sectionTitle: "Giá trị cho Hệ sinh thái IP",
    sectionSubtitle: "Cơ chế token giúp đưa vốn, cộng đồng và thanh khoản đến gần tài sản trí tuệ hơn",
    learnMore: "Tìm hiểu thêm",
    stats: [
      { value: "24/7", label: "Thanh khoản thứ cấp" },
      { value: "RWA", label: "Tài sản trí tuệ mã hóa" },
      { value: "IP", label: "Nguồn vốn cho prototype" },
    ],
    scientists: {
      title: "Chủ sở hữu IP",
      items: [
        {
          title: "Huy động vốn cho prototype",
          description: "Tiếp cận nguồn vốn sớm để phát triển sản phẩm mẫu, kiểm định và sản xuất thử nghiệm.",
        },
        {
          title: "Giảm phụ thuộc vào vốn truyền thống",
          description: "Không cần chờ ngân hàng, quỹ hoặc doanh nghiệp lớn trước khi kiểm chứng giá trị thị trường.",
        },
        {
          title: "Minh bạch và chuẩn hóa hồ sơ",
          description: "Hồ sơ IP được thẩm định, chuẩn hóa và thể hiện rõ quyền lợi kinh tế khi gọi vốn.",
        },
      ],
    },
    enterprises: {
      title: "Nhà đầu tư",
      items: [
        {
          title: "Tiếp cận IP giai đoạn sớm",
          description: "Tham gia vào sáng chế và phát minh tiềm năng trước khi chúng trở thành sản phẩm thương mại.",
        },
        {
          title: "Chia nhỏ vốn và rủi ro",
          description: "Đầu tư theo quy mô linh hoạt, phân tán rủi ro qua nhiều tài sản trí tuệ khác nhau.",
        },
        {
          title: "Thanh khoản thứ cấp",
          description: "Giao dịch token IP trên DEX để có lối ra thanh khoản và tín hiệu định giá thị trường.",
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
    sectionSubtitle: "Từ chuẩn hóa IP, launchpad sơ cấp đến thanh khoản thứ cấp và mở rộng toàn cầu",
    phases: [
      {
        phase: "Giai đoạn 1",
        title: "Thẩm định & Launchpad",
        status: "active",
        items: [
          "Chuẩn hóa hồ sơ IP đầu tiên",
          "Mở thị trường sơ cấp cho token IP",
          "Huy động vốn cho prototype",
          "Xây dựng cộng đồng nhà đầu tư",
        ],
      },
      {
        phase: "Giai đoạn 2",
        title: "DEX & Thanh khoản",
        status: "upcoming",
        items: [
          "Kích hoạt giao dịch thứ cấp",
          "Tạo thanh khoản 24/7 cho token IP",
          "Hình thành giá tham chiếu thị trường",
          "Mở rộng nhóm tài sản trí tuệ",
        ],
      },
      {
        phase: "Giai đoạn 3",
        title: "Mở rộng Toàn cầu",
        status: "future",
        items: [
          "Kết nối nhà đầu tư quốc tế",
          "Multi-chain, multi-currency",
          "Hợp tác với viện nghiên cứu và đại học",
          "Chuẩn hóa mô hình IP-RWA",
        ],
      },
    ],
  },

  LEGAL: {
    items: [
      "Token đại diện lợi ích kinh tế gắn với tài sản trí tuệ",
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
      email: "huynhtarn@gmail.com",
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
    tagline: "Launchpad mã hóa sáng chế & phát minh khoa học công nghệ",
    columns: [
      {
        title: "Nền tảng",
        links: [
          { label: "Thẩm định IP", href: "#giai-phap" },
          { label: "Launchpad", href: "#giai-phap" },
          { label: "DEX", href: "#giai-phap" },
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
          { label: "huynhtarn@gmail.com", href: "mailto:huynhtarn@gmail.com" },
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
    tagline: "TOKENIZE INVENTIONS & SCIENTIFIC IP",
    heroLines: [
      { text: "TOKENIZE", outline: false },
      { text: "INVENTIONS", outline: true },
      { text: "SCIENCE", outline: false },
    ],
    subheading:
      "A launchpad for scientific inventions and intellectual property using RWA tokenization",
    description:
      "IP Foundation connects intellectual property with early capital to accelerate prototypes, share commercialization risk, and improve the odds that inventions reach the market.",
    ctaPrimary: "Open Launchpad",
    ctaSecondary: "List Your IP →",
    stats: [
      { label: "Early R&D Funding", value: "R&D" },
      { label: "RWA Tokenization", value: "RWA" },
      { label: "Shared Risk", value: "Token" },
    ],
  },

  PROBLEM: {
    sectionTitle: "Context & Challenges",
    sectionSubtitle:
      "IP commercialization rates remain low globally; in Vietnam, the gap from research to prototype is even harder to finance",
    cards: [
      {
        icon: "EyeOff",
        title: "Research-to-market gap",
        description:
          "Scientific results need a capital bridge before they can become prototypes, be validated, and meet real market demand.",
      },
      {
        icon: "BarChart3",
        title: "Funding gap and financial barriers",
        description:
          "Prototype development, validation, and trial production require capital before revenue exists, while venture funding usually favors proven traction.",
      },
      {
        icon: "Unlink",
        title: "Hard to value, hard to finance",
        description:
          "Intellectual property is difficult to price and rarely accepted as traditional collateral, limiting participation from banks and financial institutions.",
      },
    ],
  },

  SOLUTION: {
    sectionTitle: "Solution — 4 Pillars",
    sectionSubtitle:
      "IP Foundation standardizes intellectual property, tokenizes economic rights, and opens capital markets to the community",
    pillars: [
      {
        icon: "ShieldCheck",
        title: "Verification & Standardization",
        subtitle: "Ownership verification",
        description:
          "Verify IP ownership, check disputes, and standardize legal and technical documentation before an asset enters the platform.",
        features: ["Ownership verification", "IP dossier standardization", "Dispute checks"],
      },
      {
        icon: "Hexagon",
        title: "RWA Tokenization",
        subtitle: "Fractional economic rights",
        description:
          "Split the economic rights of intellectual property into tokens so more investors can participate, risk can be shared, and global capital can enter earlier.",
        features: ["Tokenized economic rights", "Shared risk", "Broader investor access"],
      },
      {
        icon: "ShoppingBag",
        title: "Launchpad",
        subtitle: "Primary market",
        description:
          "Raise early capital for IP assets so the community can fund prototype development, validation, and trial production.",
        features: ["Primary fundraising", "Community-backed R&D", "Prototype capital"],
      },
      {
        icon: "Handshake",
        title: "DEX",
        subtitle: "Secondary market",
        description:
          "Create 24/7 liquidity for IP tokens, helping the market discover prices and giving investors a secondary trading path.",
        features: ["24/7 trading", "Liquidity for IP", "Market price discovery"],
      },
    ],
  },

  TOKEN_WORKS: {
    sectionTitle: "How IP Tokens Work",
    sectionSubtitle: "Each token represents economic exposure to a specific intellectual property asset",
    steps: [
      {
        number: "01",
        title: "Represent Economic Rights",
        description:
          "Each token represents economic rights linked to an intellectual property asset that has been verified and standardized.",
        detail: "Token = Economic rights",
      },
      {
        number: "02",
        title: "Fractionalize Value & Risk",
        description:
          "High-value IP is divided into investment portions suitable for different capital sizes while spreading commercialization risk across the community.",
        detail: "1 IP → Many investors",
      },
      {
        number: "03",
        title: "Raise Capital",
        description:
          "The community can fund IP assets by buying IP tokens in the primary launchpad market.",
        detail: "Token → Prototype capital",
      },
      {
        number: "04",
        title: "Create Liquidity",
        description:
          "After the primary phase, investors can trade 24/7 in the secondary market to create liquidity for IP tokens.",
        detail: "DEX → IP liquidity",
      },
    ],
  },

  STAKEHOLDERS: {
    sectionTitle: "Participants",
    sectionSubtitle: "A multi-party ecosystem connecting IP owners, investor communities, and verification partners",
    tabs: [
      {
        id: "supply",
        label: "IP Owners",
        title: "Intellectual Property Owners",
        description: "People and organizations that own inventions, patents, and research results that need capital to commercialize",
        items: [
          "Research Institutes & Universities",
          "Independent Scientists",
          "Corporate R&D Teams",
          "Patent and utility-solution owners",
        ],
      },
      {
        id: "demand",
        label: "Investors",
        title: "Investor Community",
        description: "People who want early exposure to promising intellectual property through tokenized participation",
        items: [
          "Individual Investors",
          "Venture Capital Funds (VC)",
          "Enterprises seeking new technology",
          "Web3 and RWA communities",
        ],
      },
      {
        id: "intermediary",
        label: "Verification & Support",
        title: "Verification, Legal, and Execution Partners",
        description: "Partners that help price, standardize, protect, and bring IP assets to market",
        items: [
          "Technology Transfer Organizations",
          "Valuation Firms",
          "IP Legal Consultants",
          "Trial production and commercialization partners",
        ],
      },
    ],
  },

  BENEFITS: {
    sectionTitle: "Value for the IP Ecosystem",
    sectionSubtitle: "Token mechanics bring capital, community, and liquidity closer to intellectual property",
    learnMore: "Learn more",
    stats: [
      { value: "24/7", label: "Secondary liquidity" },
      { value: "RWA", label: "Tokenized IP assets" },
      { value: "IP", label: "Prototype capital" },
    ],
    scientists: {
      title: "IP Owners",
      items: [
        {
          title: "Raise prototype capital",
          description: "Access early funding for prototypes, validation, and trial production.",
        },
        {
          title: "Reduce dependence on traditional finance",
          description: "Do not wait for banks, large enterprises, or venture funds before testing market appetite.",
        },
        {
          title: "Standardized and transparent IP profile",
          description: "Present verified IP documentation and clear economic rights when raising capital.",
        },
      ],
    },
    enterprises: {
      title: "Investors",
      items: [
        {
          title: "Early access to IP assets",
          description: "Participate in promising inventions before they become commercial products.",
        },
        {
          title: "Fractional capital and risk",
          description: "Invest with flexible sizing and spread risk across multiple IP assets.",
        },
        {
          title: "Secondary liquidity",
          description: "Trade IP tokens on a DEX for a liquidity path and market price signal.",
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
    sectionSubtitle: "From IP standardization and primary launchpad to secondary liquidity and global expansion",
    phases: [
      {
        phase: "Phase 1",
        title: "Verification & Launchpad",
        status: "active",
        items: [
          "Standardize initial IP profiles",
          "Open primary market for IP tokens",
          "Fund prototype development",
          "Build the investor community",
        ],
      },
      {
        phase: "Phase 2",
        title: "DEX & Liquidity",
        status: "upcoming",
        items: [
          "Enable secondary trading",
          "Create 24/7 liquidity for IP tokens",
          "Establish market price references",
          "Expand the IP asset universe",
        ],
      },
      {
        phase: "Phase 3",
        title: "Global Expansion",
        status: "future",
        items: [
          "Connect international investors",
          "Multi-chain, multi-currency",
          "Partner with universities and research institutes",
          "Standardize the IP-RWA model",
        ],
      },
    ],
  },

  LEGAL: {
    items: [
      "Tokens represent economic rights linked to intellectual property",
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
      email: "huynhtarn@gmail.com",
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
    tagline: "Launchpad for tokenized inventions and scientific intellectual property",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "IP Verification", href: "#giai-phap" },
          { label: "Launchpad", href: "#giai-phap" },
          { label: "DEX", href: "#giai-phap" },
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
          { label: "huynhtarn@gmail.com", href: "mailto:huynhtarn@gmail.com" },
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
