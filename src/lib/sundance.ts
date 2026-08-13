export const sundance = {
  name: "Min's Sun Dance",
  legalName: "Min's Sun Dance Massage",
  phoneDisplay: "(825) 984-2728",
  phoneHref: "tel:+18259842728",
  smsHref: "sms:+18259842728",
  bookUrl: "https://minsundancemassage.as.me/",
  locations: [
    {
      id: "twelfth",
      name: "12th Avenue",
      neighborhood: "Beltline",
      address: "1330 12th Ave SW",
      city: "Calgary, AB",
      note: "Free parking",
      mapsUrl: "https://maps.google.com/?q=1330+12th+Ave+SW+Calgary+AB",
      bookUrl:
        "https://minsundancemassage.as.me/?appointmentType=category%3A1330+12th+Ave.+SW",
    },
    {
      id: "sun-valley",
      name: "Sun Valley",
      neighborhood: "Southeast",
      address: "127 Sun Valley Dr SE",
      city: "Calgary, AB",
      note: "Open 9am–8pm",
      mapsUrl: "https://maps.google.com/?q=127+Sun+Valley+Dr+SE+Calgary+AB",
      bookUrl:
        "https://minsundancemassage.as.me/?appointmentType=category%3A127+Sun+Valley+Dr.+SE",
    },
  ],
  serviceBooks: {
    acupuncture:
      "https://minsundancemassage.as.me/?appointmentType=category%3AAcupuncture",
    laser: "https://minsundancemassage.as.me/?appointmentType=category%3ALaser",
    osteopathy:
      "https://minsundancemassage.as.me/?appointmentType=category%3AManual+Osteopathy",
    other:
      "https://minsundancemassage.as.me/?appointmentType=category%3AOther+Services",
  },
} as const;

export const sundanceServices = [
  {
    title: "Massage therapy",
    body: "Deep tissue, Thai, Swedish, and table massage — with hot stone, cupping, or luxury hot globe when you want extra relief.",
    bookUrl: sundance.locations[0].bookUrl,
  },
  {
    title: "Acupuncture",
    body: "Gentle, precise needle work for pain, mobility, stress, and recovery. Direct billing available with licensed practitioners.",
    bookUrl: sundance.serviceBooks.acupuncture,
  },
  {
    title: "Physiotherapy",
    body: "Hands-on care and targeted exercise so you can recover from injury, rebuild strength, and move the way you want to again.",
    bookUrl: sundance.bookUrl,
  },
  {
    title: "Manual osteopathy",
    body: "Treat the way muscles, joints, and nerves work together — for chronic pain, posture, and that stuck feeling that never quite leaves.",
    bookUrl: sundance.serviceBooks.osteopathy,
  },
  {
    title: "Laser treatments",
    body: "Skin tightening, hair removal, and tattoo removal using current laser technology, with care across most skin types.",
    bookUrl: sundance.serviceBooks.laser,
  },
] as const;

export const sundanceRates = [
  {
    name: "Table massage",
    items: [
      { duration: "45 min", price: "$79" },
      { duration: "60 min", price: "$99" },
      { duration: "75 min", price: "$125" },
      { duration: "90 min", price: "$145" },
      { duration: "120 min", price: "$189" },
    ],
  },
  {
    name: "Thai & deep tissue",
    items: [
      { duration: "60 min", price: "$109" },
      { duration: "90 min", price: "$159" },
      { duration: "120 min", price: "$209" },
    ],
  },
  {
    name: "Student massage",
    note: "No direct billing or receipt",
    items: [
      { duration: "60 min", price: "$90" },
      { duration: "90 min", price: "$135" },
      { duration: "120 min", price: "$180" },
    ],
  },
] as const;

export const sundanceReviews = [
  {
    quote:
      "I don’t have to tell her where it hurts — she finds it. If you need the best deep tissue in Calgary, Min is your person.",
    source: "Google review",
  },
  {
    quote:
      "Just the right pressure to relieve tension without leaving you wrecked. The clinic is clean, calming, and well looked after.",
    source: "Google review",
  },
  {
    quote:
      "Neck, shoulder, back — she works through it and you walk out feeling like yourself again. I’ll keep coming back.",
    source: "Google review",
  },
] as const;
