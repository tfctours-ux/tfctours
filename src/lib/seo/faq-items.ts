// src/lib/seo/faq-items.ts
export interface FaqItem {
  id: string;
  question: { en: string; ur: string };
  answer: { en: string; ur: string };
}

export const TFC_FAQ_ITEMS: FaqItem[] = [
  {
    id: "iata-certified",
    question: {
      en: "Is The Flight Centre IATA certified?",
      ur: "کیا دی فلائٹ سینٹر آئی اے ٹی اے سرٹیفائیڈ ہے؟",
    },
    answer: {
      en: "Yes. The Flight Centre Travel & Tours is an IATA certified travel agency based in Gujranwala, Pakistan. We operate from two offices and have been serving clients for over 20 years.",
      ur: "جی ہاں۔ دی فلائٹ سینٹر ٹریول اینڈ ٹورز گوجرانوالہ، پاکستان میں مقیم ایک آئی اے ٹی اے سرٹیفائیڈ ٹریول ایجنسی ہے۔ ہم دو دفاتر سے کام کرتے ہیں اور 20 سال سے زائد عرصے سے گاہکوں کی خدمت کر رہے ہیں۔",
    },
  },
  {
    id: "umrah-in-gujranwala",
    question: {
      en: "Which travel agency in Gujranwala offers Umrah packages?",
      ur: "گوجرانوالہ میں کون سی ٹریول ایجنسی عمرہ پیکجز پیش کرتی ہے؟",
    },
    answer: {
      en: "The Flight Centre Travel & Tours at Office 36-37 Jinnah Stadium, Gujranwala offers complete Umrah packages including hotel, air ticket, transport and Umrah visa. Call UAN 111-786-788.",
      ur: "دی فلائٹ سینٹر ٹریول اینڈ ٹورز، آفس 36-37 جناح اسٹیڈیم گوجرانوالہ مکمل عمرہ پیکجز پیش کرتا ہے جن میں ہوٹل، ہوائی ٹکٹ، ٹرانسپورٹ اور عمرہ ویزہ شامل ہیں۔ یو اے این 111-786-788 پر رابطہ کریں۔",
    },
  },
  {
    id: "umrah-durations",
    question: {
      en: "What Umrah package durations are available?",
      ur: "کون کون سی مدت کے عمرہ پیکجز دستیاب ہیں؟",
    },
    answer: {
      en: "The Flight Centre offers 15-day, 21-day and 28-day Umrah packages from Pakistan, covering hotel near Haram, return air ticket, Umrah visa, ground transport and Ziyarat.",
      ur: "دی فلائٹ سینٹر پاکستان سے 15 دن، 21 دن اور 28 دن کے عمرہ پیکجز پیش کرتا ہے جن میں حرم کے قریب ہوٹل، واپسی کا ہوائی ٹکٹ، عمرہ ویزہ، گراؤنڈ ٹرانسپورٹ اور زیارت شامل ہیں۔",
    },
  },
  {
    id: "flight-booking",
    question: {
      en: "Does The Flight Centre book international flights?",
      ur: "کیا دی فلائٹ سینٹر بین الاقوامی پروازیں بک کرتا ہے؟",
    },
    answer: {
      en: "Yes. We provide airline ticket booking for all international and domestic routes. Visit our flight booking portal at theflightcentre.pk for online bookings.",
      ur: "جی ہاں۔ ہم تمام بین الاقوامی اور ملکی روٹس کے لیے ائیر لائن ٹکٹ بکنگ فراہم کرتے ہیں۔ آن لائن بکنگ کے لیے theflightcentre.pk پر تشریف لائیں۔",
    },
  },
  {
    id: "tour-destinations",
    question: {
      en: "What tour destinations does The Flight Centre cover?",
      ur: "دی فلائٹ سینٹر کن مقامات کے ٹور پیکجز فراہم کرتا ہے؟",
    },
    answer: {
      en: "We offer curated tour packages to Dubai, Malaysia, Thailand, Singapore, Bahrain, Azerbaijan, Oman, Cambodia, Sri Lanka, Iran, Indonesia and 50+ more destinations.",
      ur: "ہم دبئی، ملائیشیا، تھائی لینڈ، سنگاپور، بحرین، آذربائیجان، عمان، کمبوڈیا، سری لنکا، ایران، انڈونیشیا اور 50 سے زائد مقامات کے لیے منتخب ٹور پیکجز پیش کرتے ہیں۔",
    },
  },
  {
    id: "visit-visa",
    question: {
      en: "How do I get a visit visa through The Flight Centre?",
      ur: "میں دی فلائٹ سینٹر کے ذریعے وزٹ ویزہ کیسے حاصل کر سکتا ہوں؟",
    },
    answer: {
      en: "Contact our office with your destination and travel dates. We provide document guidance, application support and processing assistance for all countries.",
      ur: "اپنی منزل اور سفر کی تاریخیں لے کر ہمارے دفتر سے رابطہ کریں۔ ہم تمام ممالک کے لیے دستاویزات کی رہنمائی، درخواست کی معاونت اور پروسیسنگ میں مدد فراہم کرتے ہیں۔",
    },
  },
  {
    id: "b2b-portal",
    question: {
      en: "Does The Flight Centre offer a B2B portal for travel agents?",
      ur: "کیا دی فلائٹ سینٹر ٹریول ایجنٹس کے لیے B2B پورٹل پیش کرتا ہے؟",
    },
    answer: {
      en: "Yes. The Flight Centre offers a web portal ID for travel agencies with same-day activation. Features include multi-user ID support, ticket management and round-the-clock connectivity. Visit agent.tfctours.com.",
      ur: "جی ہاں۔ دی فلائٹ سینٹر ٹریول ایجنسیوں کو اسی دن ایکٹیویشن کے ساتھ ویب پورٹل آئی ڈی فراہم کرتا ہے۔ خصوصیات میں ملٹی یوزر آئی ڈی سپورٹ، ٹکٹ مینجمنٹ اور 24/7 کنیکٹیویٹی شامل ہیں۔ agent.tfctours.com پر تشریف لائیں۔",
    },
  },
  {
    id: "uan",
    question: {
      en: "What is the UAN number for The Flight Centre?",
      ur: "دی فلائٹ سینٹر کا یو اے این نمبر کیا ہے؟",
    },
    answer: {
      en: "The UAN is 111-786-788. You can also call 0304-111-9-786 or reach our 24/7 helpdesk on the same number.",
      ur: "یو اے این 111-786-788 ہے۔ آپ 0304-111-9-786 پر بھی کال کر سکتے ہیں یا اسی نمبر پر ہمارے 24/7 ہیلپ ڈیسک سے رابطہ کر سکتے ہیں۔",
    },
  },
];

export const UMRAH_FAQ_ITEMS: FaqItem[] = [
  {
    id: "umrah-hotel-distance",
    question: {
      en: "How far are the hotels from Haram in your Umrah packages?",
      ur: "آپ کے عمرہ پیکجز میں ہوٹل حرم سے کتنے فاصلے پر ہیں؟",
    },
    answer: {
      en: "We offer hotels ranging from walking distance (within 300-500 meters) to shuttle-service options, depending on whether you choose a 3-star, 4-star, or 5-star package.",
      ur: "ہم پیدل فاصلے پر (300 سے 500 میٹر کے اندر) اور شٹل سروس والے ہوٹلز پیش کرتے ہیں، جس کا انحصار اس بات پر ہے کہ آپ 3 اسٹار، 4 اسٹار، یا 5 اسٹار پیکج منتخب کرتے ہیں۔",
    },
  },
  {
    id: "umrah-visa-only",
    question: {
      en: "Can I book only the Umrah visa without hotel accommodation?",
      ur: "کیا میں ہوٹل کے بغیر صرف عمرہ ویزہ حاصل کر سکتا ہوں؟",
    },
    answer: {
      en: "Yes, we offer individual Umrah visa processing. However, booking a complete package with hotel and transport is highly recommended for a smooth and hassle-free journey.",
      ur: "جی ہاں، ہم الگ سے عمرہ ویزہ پروسیسنگ بھی فراہم کرتے ہیں۔ تاہم، پرسکون اور باسہولت سفر کے لیے ہوٹل اور ٹرانسپورٹ کے ساتھ مکمل پیکج بک کروانے کی سختی سے سفارش کی جاتی ہے۔",
    },
  },
];

export const TOUR_FAQ_ITEMS: FaqItem[] = [
  {
    id: "tour-customization",
    question: {
      en: "Can I customize the tour itinerary and travel dates?",
      ur: "کیا میں ٹور پلان اور سفر کی تاریخیں اپنی مرضی سے تبدیل کر سکتا ہوں؟",
    },
    answer: {
      en: "Absolutely. While we offer popular pre-planned group tours, our team specializes in designing fully customized itineraries tailored to your budget, dates, and preferred destinations.",
      ur: "جی بالکل۔ ہم مقبول بنے بنائے گروپ ٹورز پیش کرتے ہیں، لیکن ہماری ٹیم آپ کے بجٹ، تاریخوں اور پسندیدہ مقامات کے مطابق مکمل طور پر کسٹمائزڈ ٹورز ڈیزائن کرنے میں مہارت رکھتی ہے۔",
    },
  },
  {
    id: "tour-visa-assistance",
    question: {
      en: "Is visa processing included in the international tour packages?",
      ur: "کیا انٹرنیشنل ٹور پیکجز میں ویزا پروسیسنگ شامل ہوتی ہے؟",
    },
    answer: {
      en: "Visa guidance and complete documentation support are included in all our tour packages. Actual visa approval depends on the respective embassy's policy.",
      ur: "ہمارے تمام ٹور پیکجز میں ویزا گائیڈنس اور مکمل کاغذی تیاری کی سپورٹ شامل ہوتی ہے۔ ویزے کی حتمی منظوری متعلقہ سفارت خانے کی پالیسی پر منحصر ہے۔",
    },
  },
];

export const TICKET_FAQ_ITEMS: FaqItem[] = [
  {
    id: "ticket-refunds",
    question: {
      en: "What is your refund and cancellation policy for flight tickets?",
      ur: "فلائٹ ٹکٹ کینسل یا ریفنڈ کروانے کی کیا پالیسی ہے؟",
    },
    answer: {
      en: "Refunds and change penalties depend strictly on the respective airline's fare rules. Our support desk will assist you in processing these requests efficiently.",
      ur: "ریفنڈ اور تبدیلی کے چارجز کا انحصار مکمل طور پر متعلقہ ایئرلائن کے کرائے کے قوانین پر ہوتا ہے۔ ہمارا سپورٹ ڈیسک ان درخواستوں کو تیزی سے پراسیس کرنے میں آپ کی مدد کرے گا۔",
    },
  },
  {
    id: "ticket-luggage",
    question: {
      en: "How can I check the baggage allowance for my booked flight?",
      ur: "میں اپنی بک شدہ فلائٹ کے لیے سامان کی اجازت (بیگیج الاؤنس) کیسے چیک کر سکتا ہوں؟",
    },
    answer: {
      en: "Your baggage allowance is printed directly on the e-ticket we issue. You can also verify it on the airline's official website using your PNR reference.",
      ur: "سامان کی اجازت کا وزن براہ راست ہمارے جاری کردہ ای ٹکٹ پر درج ہوتا ہے۔ آپ اپنے پی این آر (PNR) نمبر کے ذریعے متعلقہ ایئرلائن کی ویب سائٹ پر بھی اس کی تصدیق کر سکتے ہیں۔",
    },
  },
];

export const VISA_FAQ_ITEMS: FaqItem[] = [
  {
    id: "visa-requirements",
    question: {
      en: "What are the basic documents required for a visit visa application?",
      ur: "وزٹ ویزہ کی درخواست کے لیے کون سے بنیادی دستاویزات درکار ہوتے ہیں؟",
    },
    answer: {
      en: "Typically, you need a valid passport (minimum 6 months), recent photographs, national identity card (CNIC), family registration certificate (FRC), and a solid 6-month bank statement.",
      ur: "عمومی طور پر آپ کو ایک کارآمد پاسپورٹ (کم از کم 6 ماہ معیاد)، تازہ تصاویر، شناختی کارڈ (CNIC)، فیملی رجسٹریشن سرٹیفکیٹ (FRC)، اور 6 ماہ کی مستند بینک اسٹیٹمنٹ کی ضرورت ہوتی ہے۔",
    },
  },
  {
    id: "visa-processing-time",
    question: {
      en: "How long does it take to process a tourist visa?",
      ur: "ٹورسٹ ویزا پروسیس ہونے میں کتنا وقت لگتا ہے؟",
    },
    answer: {
      en: "Processing times vary from 3 to 10 working days for Gulf countries, and 3 to 6 weeks or more for standard visitor visas to the UK, Schengen, USA, Canada, and Australia.",
      ur: "خلیجی ممالک کے لیے پروسیسنگ ٹائم 3 سے 10 ورکنگ ڈیز ہے، جبکہ یو کے، شینگن، یو ایس اے، کینیڈا اور آسٹریلیا کے وزٹ ویزا کے لیے 3 سے 6 ہفتے یا اس سے زیادہ کا وقت لگ سکتا ہے۔",
    },
  },
];

export const HOTEL_FAQ_ITEMS: FaqItem[] = [
  {
    id: "hotel-checkin",
    question: {
      en: "Are the hotel bookings confirmed instantly?",
      ur: "کیا ہوٹل کی بکنگ فوری طور پر کنفرم ہو جاتی ہے؟",
    },
    answer: {
      en: "Yes, once payment is processed, we issue official confirmed hotel vouchers that are directly verifiable with the property's reception desk.",
      ur: "جی ہاں، پیمنٹ پراسیس ہونے کے بعد ہم آفیشل کنفرم ہوٹل واؤچر جاری کرتے ہیں جن کی تصدیق ہوٹل کے استقبالیہ ڈیسک سے براہ راست کی جا سکتی ہے۔",
    },
  },
  {
    id: "hotel-changes",
    question: {
      en: "Can I modify my hotel reservation after booking?",
      ur: "کیا میں بکنگ کے بعد ہوٹل ریزرویشن میں تبدیلی کر سکتا ہوں؟",
    },
    answer: {
      en: "Modifications depend on the hotel's cancellation policy. Non-refundable bookings cannot be changed, while flexible rates can be updated before the deadline.",
      ur: "تبدیلیوں کا انحصار ہوٹل کی منسوخی کی پالیسی پر ہوتا ہے۔ نان ریفنڈایبل بکنگز میں تبدیلی نہیں ہو سکتی، جبکہ فلیکسیبل ریٹس کو مقررہ تاریخ سے پہلے تبدیل کیا جا سکتا ہے۔",
    },
  },
];

export const INSURANCE_FAQ_ITEMS: FaqItem[] = [
  {
    id: "insurance-coverage",
    question: {
      en: "Does your travel insurance cover emergency medical expenses?",
      ur: "کیا آپ کی ٹریول انشورنس ہنگامی طبی اخراجات کو کور کرتی ہے؟",
    },
    answer: {
      en: "Yes, our travel insurance plans cover emergency medical treatments, hospitalization abroad, trip delays, baggage loss, and embassy-mandated visa requirements.",
      ur: "جی ہاں، ہمارے سفری انشورنس پلانز ہنگامی طبی علاج، بیرون ملک ہسپتال کے اخراجات، سفر میں تاخیر، سامان کی گمشدگی اور سفارت خانوں کے مطلوبہ ویزا قوانین کو کور کرتے ہیں۔",
    },
  },
  {
    id: "insurance-embassy-approved",
    question: {
      en: "Is the travel insurance certificate approved by Schengen embassies?",
      ur: "کیا آپ کا ٹریول انشورنس سرٹیفکیٹ شینگن سفارت خانوں سے منظور شدہ ہوتا ہے؟",
    },
    answer: {
      en: "Absolutely. All our travel insurance certificates are issued by top-rated companies and are fully compliant with Schengen, UK, USA, and Gulf embassy requirements.",
      ur: "جی بالکل۔ ہمارے تمام ٹریول انشورنس سرٹیفکیٹس اعلیٰ ترین کمپنیوں کے جاری کردہ ہوتے ہیں اور شینگن، یو کے، یو ایس اے اور خلیجی سفارت خانوں کے تقاضوں کے عین مطابق ہیں۔",
    },
  },
];

export const SERVICE_FAQ_MAP: Record<string, FaqItem[]> = {
  "umrah-packages": UMRAH_FAQ_ITEMS,
  "tour-packages": TOUR_FAQ_ITEMS,
  "ticket-booking": TICKET_FAQ_ITEMS,
  "visit-visa": VISA_FAQ_ITEMS,
  "hotel-booking": HOTEL_FAQ_ITEMS,
  "travel-insurance": INSURANCE_FAQ_ITEMS,
};

