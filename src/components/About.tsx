import { Card, CardContent } from "@/components/ui/card";
import { Microscope, Heart, Globe, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            About <span className="text-primary">Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated to advancing healthcare through innovation and excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">Our Mission</h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              To transform healthcare by developing innovative pharmaceutical solutions that improve patient 
              outcomes while maintaining the highest standards of safety, efficacy, and accessibility.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that every person deserves access to quality healthcare, and we work tirelessly 
              to bridge the gap between cutting-edge research and practical medical solutions.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-foreground mb-6">Our Values</h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-6 w-6 rounded-full bg-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Quality Excellence</h4>
                  <p className="text-muted-foreground">
                    Maintaining the highest standards in pharmaceutical manufacturing and research
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-6 w-6 rounded-full bg-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Innovation</h4>
                  <p className="text-muted-foreground">
                    Continuously exploring new ways to improve healthcare solutions
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <div className="h-6 w-6 rounded-full bg-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Accessibility</h4>
                  <p className="text-muted-foreground">
                    Making quality healthcare accessible to all through affordable solutions
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;