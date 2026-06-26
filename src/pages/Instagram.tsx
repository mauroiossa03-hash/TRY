import InstagramGlyph from "../components/InstagramGlyph";
import RedirectPage from "./RedirectPage";
import { INSTAGRAM_URL } from "../lib/config";
import { useDocTitle } from "../lib/useDocTitle";

export default function Instagram() {
  useDocTitle("Instagram — Quantitative Betting");

  return (
    <RedirectPage
      icon={InstagramGlyph}
      brandColor="#e1306c"
      label="Instagram"
      handle="@quantitative.betting"
      description="Follow along for performance recaps, strategy breakdowns, and behind-the-scenes looks at the model."
      url={INSTAGRAM_URL}
    />
  );
}
