import InstagramGlyph from "../components/InstagramGlyph";
import RedirectPage from "./RedirectPage";
import { INSTAGRAM_URL } from "../lib/config";

export default function Instagram() {
  return (
    <RedirectPage
      icon={InstagramGlyph}
      brandColor="#e1306c"
      label="Instagram"
      handle="@spinedge.signals"
      description="Follow along for performance recaps, strategy breakdowns, and behind-the-scenes looks at the model."
      url={INSTAGRAM_URL}
    />
  );
}
