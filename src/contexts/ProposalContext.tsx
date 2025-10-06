import { createContext, useContext, useState, ReactNode } from "react";
import { TimelinePhase } from "@/components/cards/TimelineCard";
import { PricingSection } from "@/components/cards/PricingCard";
import { ImageCardData } from "@/components/cards/ImageCard";
import { VideoCardData } from "@/components/cards/VideoCard";
import { TeamMember } from "@/components/cards/TeamExpertiseCard";
import { ImplementationStep } from "@/components/cards/ImplementationPlanCard";
import { Risk } from "@/components/cards/RiskMitigationCard";
import { SupportItem } from "@/components/cards/SupportMaintenanceCard";
import { TextSectionData } from "@/components/cards/TextSectionCard";
import { InfographicSummaryData } from "@/components/cards/InfographicSummaryCard";
import { BeforeAfterData } from "@/components/cards/BeforeAfterCard";
import { FAQData } from "@/components/cards/FAQCard";

export type ProposalCard =
  | { id: string; type: "timeline"; data: TimelinePhase[] }
  | { id: string; type: "pricing"; data: PricingSection[] }
  | { id: string; type: "image"; data: ImageCardData }
  | { id: string; type: "video"; data: VideoCardData }
  | { id: string; type: "team"; data: TeamMember[] }
  | { id: string; type: "implementation"; data: ImplementationStep[] }
  | { id: string; type: "risk"; data: Risk[] }
  | { id: string; type: "support"; data: SupportItem[] }
  | { id: string; type: "text"; data: TextSectionData }
  | { id: string; type: "infographic"; data: InfographicSummaryData }
  | { id: string; type: "beforeafter"; data: BeforeAfterData }
  | { id: string; type: "faq"; data: FAQData };

interface ProposalData {
  title: string;
  client: string;
  clientAddress: string;
  description: string;
  jobNumber: string;
  preparedBy: string;
  version: string;
  eventLocation: string;
  eventAddress: string;
  eventStartDate: string;
  eventEndDate: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  termsAndConditions: string;
}

interface ProposalContextType {
  proposalData: ProposalData;
  setProposalData: (data: ProposalData) => void;
  cards: ProposalCard[];
  setCards: (cards: ProposalCard[]) => void;
  updateCard: (id: string, data: any) => void;
  addCard: (type: ProposalCard["type"]) => void;
  removeCard: (id: string) => void;
}

const ProposalContext = createContext<ProposalContextType | undefined>(undefined);

export function ProposalProvider({ children }: { children: ReactNode }) {
  const [proposalData, setProposalData] = useState<ProposalData>({
    title: "Website Redesign",
    client: "Acme Corp",
    clientAddress: "123 Main St, Suite 100, City, State 12345",
    description: "Complete website redesign with modern UI/UX",
    jobNumber: "302798",
    preparedBy: "Your Name",
    version: "1.0",
    eventLocation: "Client Office",
    eventAddress: "123 Event Venue, City, State 12345",
    eventStartDate: "2025-11-01",
    eventEndDate: "2025-11-15",
    contactName: "John Doe",
    contactPhone: "+1 (555) 123-4567",
    contactEmail: "john.doe@acmecorp.com",
    termsAndConditions: "1. Payment Terms: 50% upfront, 50% upon completion.\n2. Project timeline is subject to client feedback and approval times.\n3. Additional revisions beyond the agreed scope will be charged separately.\n4. All intellectual property rights transfer upon final payment.\n5. Either party may terminate with 30 days written notice.",
  });

  const [cards, setCards] = useState<ProposalCard[]>([
    {
      id: "1",
      type: "text",
      data: { title: "Project Overview", content: "This comprehensive redesign project aims to transform your digital presence with a modern, user-centric approach. We'll leverage cutting-edge technologies and design principles to create an engaging, performant website that drives results." },
    },
    {
      id: "2",
      type: "timeline",
      data: [
        { phase: "Discovery & Planning", duration: "2 weeks", tasks: "Requirements gathering, research, competitive analysis" },
        { phase: "Design", duration: "3 weeks", tasks: "Wireframes, mockups, prototypes, user testing" },
        { phase: "Development", duration: "6 weeks", tasks: "Frontend and backend implementation, integrations" },
        { phase: "Testing & Launch", duration: "1 week", tasks: "QA testing, bug fixes, deployment" },
      ],
    },
    {
      id: "3",
      type: "pricing",
      data: [
        {
          id: "1",
          title: "Design & Development",
          items: [
            { description: "UI/UX Design", quantity: 1, rate: 15000, duration: "3 weeks", discount: 0, notes: ["Includes 3 rounds of revisions"] },
            { description: "Frontend Development", quantity: 1, rate: 20000, duration: "4 weeks", discount: 0, notes: ["React + TypeScript", "Responsive design"] },
            { description: "Backend Development", quantity: 1, rate: 15000, duration: "2 weeks", discount: 10, notes: ["API integration", "Database setup"] },
          ],
        },
      ],
    },
  ]);

  const updateCard = (id: string, data: any) => {
    setCards(cards.map((card) => (card.id === id ? { ...card, data } : card)));
  };

  const addCard = (type: ProposalCard["type"]) => {
    const newCard: ProposalCard = (() => {
      switch (type) {
        case "timeline":
          return { id: Date.now().toString(), type: "timeline", data: [{ phase: "", duration: "", tasks: "" }] };
        case "pricing":
          return { id: Date.now().toString(), type: "pricing", data: [{ id: Date.now().toString(), title: "New Section", items: [] }] };
        case "image":
          return { id: Date.now().toString(), type: "image", data: { url: "", caption: "", alt: "" } };
        case "video":
          return { id: Date.now().toString(), type: "video", data: { url: "", caption: "", type: "youtube" } };
        case "team":
          return { id: Date.now().toString(), type: "team", data: [{ name: "", role: "", bio: "", image: "" }] };
        case "implementation":
          return { id: Date.now().toString(), type: "implementation", data: [{ title: "", description: "", duration: "" }] };
        case "risk":
          return { id: Date.now().toString(), type: "risk", data: [{ risk: "", mitigation: "", impact: "medium" }] };
        case "support":
          return { id: Date.now().toString(), type: "support", data: [{ title: "", description: "", duration: "", cost: "" }] };
        case "text":
          return { id: Date.now().toString(), type: "text", data: { title: "New Section", content: "" } };
        case "infographic":
          return { id: Date.now().toString(), type: "infographic", data: { title: "Key Benefits", items: [] } };
        case "beforeafter":
          return { id: Date.now().toString(), type: "beforeafter", data: { title: "Transform Your Business", beforeTitle: "Before", beforeDescription: "", afterTitle: "After", afterDescription: "" } };
        case "faq":
          return { id: Date.now().toString(), type: "faq", data: { title: "Frequently Asked Questions", items: [] } };
      }
    })();
    setCards([...cards, newCard]);
  };

  const removeCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <ProposalContext.Provider
      value={{
        proposalData,
        setProposalData,
        cards,
        setCards,
        updateCard,
        addCard,
        removeCard,
      }}
    >
      {children}
    </ProposalContext.Provider>
  );
}

export function useProposal() {
  const context = useContext(ProposalContext);
  if (context === undefined) {
    throw new Error("useProposal must be used within a ProposalProvider");
  }
  return context;
}
