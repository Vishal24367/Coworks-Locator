import React from "react";

import Hero from "../components/sections/Hero";
import LandingLayout from "../components/layouts/LandingLayout";
import { withRouter } from "react-router-dom";

const Landing = ({props}) => {
  return (
    <LandingLayout>
      <Hero
        title="कहाँ से हो? गाँव, शहर बताओ।"
        subtitle="फिर आस-पास के जगह के कोवर्क दिखाएंगे"
        image="https://source.unsplash.com/collection/404339/800x600"
        ctaText="यहाँ क्लिक करें और हमें खुद पता करने दे"
        ctaLink="/"
      />
    </LandingLayout>
  );
}

export default withRouter(Landing);