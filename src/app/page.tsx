import { HeroSection } from "@/components/blocks/hero-section";
import { ShopByChatSection } from "@/components/blocks/shop-by-chat-section";
import { FeaturedPartnersSection } from "@/components/blocks/featured-partners-section";
import { AILearnsSection } from "@/components/blocks/ai-learns-section";
import { OnePlatformSection } from "@/components/blocks/one-platform-section";
import { FooterSection } from "@/components/blocks/footer-section";

export default function Home() {
  return (
    <main className="bg-black w-full">
      <HeroSection />
      <ShopByChatSection />
      <FeaturedPartnersSection />
      <AILearnsSection />
      <OnePlatformSection />
      <FooterSection />
    </main>
  );
}
