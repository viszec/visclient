export interface ProjectType {
    title: string;
    src: string;
    color: string;
    category: string;
    client: string;
    year: string;
    liveURL: string;
  }
  

export const projects: ProjectType[] = [
    {
      title: "Acorn Ledger",
      src: "acornledger.jpg",
      color: "#000000",
      category: "Full-stack Development",
      client: "Freelance",
      year: "2025",
      liveURL: "https://acornledger.io/"
    },
    {
      title: "HiveStream",
      src: "hivestream.png",
      color: "#8C8C8C",
      category: "Front-end Development",
      client: "CognixAI",
      year: "2024",
      liveURL: "https://hivestream.au/"
    },
    {
      title: "CognixAI - Landing",
      src: "cognix.png",
      color: "#EFE8D3",
      category: "Design & Front-end Development",
      client: "CognixAI",
      year: "2024",
      liveURL: "https://cognix.au/"
    },
    {
      title: "NestEase",
      src: "nestease.png",
      color: "#706D63",
      category: "Full-stack Development",
      client: "Freelance",
      year: "2024",
      liveURL: "https://viszec.github.io/nestease/"
    },
    {
        title: "Palette Picker",
        src: "pp.png",
        color: "#706D63",
        category: "Web Development",
        client: "Freelance",
        year: "2024",
        liveURL: "https://viszec.github.io/palettepicker/"
      },
    {
      title: "Brighton ELC",
      src: "brightonelc.png",
      color: "#706D63",
      category: "Web Design & Development",
      client: "Brighton ELC",
      year: "2022",
      liveURL: "https://www.brightonelc.com.au/"
    },
    {
        title: "Oak Park CC",
        src: "opcc.png",
        color: "#706D63",
        category: "Web Design & Development",
        client: "OPCC",
        year: "2021",
        liveURL: "https://oakparkchildrenscentre.com.au/"
      },
      {
        title: "Logo Design",
        src: "acornledger.jpg",
        color: "#000000",
        category: "Logo Design",
        client: "Freelance",
        year: "2021",
        liveURL: "https://drive.google.com/file/d/1jLR7BtkqjAyDGzEnu9hRrQ_spjmi8sdQ/view"
      },
    {
      title: "Astra Early Learning",
      src: "astra.png",
      color: "#706D63",
      category: "Web Design & Development",
      client: "Silencio",
      year: "2020",
      liveURL: "https://pm.astraearlylearning.com.au/"
    }
  ];