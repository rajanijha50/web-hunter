import { TESTIMONIALS } from "@/lib/data";
import { LuQuote } from "react-icons/lu";
import Image from "next/image";

export default function Testimonials() {
  return (
    <>
      {/* Testimonials */}
      <section className="py-24 px-4 md:px-8 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-lg font-bold tracking-widest text-primary uppercase mb-4 block">
              The Explorer's Voice
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div
                role="article"
                aria-label={t.name}
                key={t._id}
                className="bg-muted/30 border border-border rounded-3xl p-8 relative"
              >
                {i === 0 && (
                  <div className="absolute -top-4 -left-4 bg-primary h-10 w-10 rounded-full flex items-center justify-center border-4 border-background">
                    <LuQuote className="h-4 w-4 text-primary-foreground fill-primary-foreground" />
                  </div>
                )}

                <p className="text-muted-foreground italic mb-8 relative z-10 leading-relaxed text-lg">
                  "{t.content}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-muted shrink-0 border-2 border-border relative">
                    <Image
                      src={`https://picsum.photos/seed/${t.avatarSeed}-user/100/100`}
                      alt={t.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">
                      {t.name}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
