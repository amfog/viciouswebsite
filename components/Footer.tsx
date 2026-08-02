import { useTranslations } from "next-intl";
import { InstagramIcon, FacebookIcon, XIcon } from "./icons/SocialIcons";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <div className="font-display text-xl font-bold">
            THE <span className="text-volt">VICIOUS</span>
          </div>
          <p className="mt-3 text-sm text-volt/80">{t("tagline")}</p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-steel">
            {t("quickLinks")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-bone/75">
            <li><Link href="/teams" className="hover:text-volt">{nav("teams")}</Link></li>
            <li><Link href="/news" className="hover:text-volt">{nav("news")}</Link></li>
            <li><Link href="/about" className="hover:text-volt">{nav("about")}</Link></li>
            <li><Link href="/leadership" className="hover:text-volt">{nav("leadership")}</Link></li>
            <li><Link href="/partners" className="hover:text-volt">{nav("partners")}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-widest text-steel">
            {t("follow")}
          </h3>
          <div className="mt-4 flex gap-3">
            <a href="https://www.instagram.com/thevicious_/" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full border border-white/15 p-2 transition hover:border-volt hover:text-volt">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61567453406889" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full border border-white/15 p-2 transition hover:border-volt hover:text-volt">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="https://x.com/TheVicious_" target="_blank" rel="noreferrer" aria-label="X" className="rounded-full border border-white/15 p-2 transition hover:border-volt hover:text-volt">
              <XIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-white/5 px-6 py-6 text-center text-xs text-steel sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} The Vicious. {t("rights")}
        </span>
        
          <a
          href="https://project-jelc4.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="transition hover:text-volt"
        >
          {t("builtBy")}
        </a>
      </div>
    </footer>
  );
}
