import { useContext } from "react";
import { Link } from "react-router-dom";
import { WeddingContext } from "@/context/WeddingContext";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";

export default function Wishes() {
  const context = useContext(WeddingContext);

  if (!context) {
    throw new Error("Wishes must be used within WeddingProvider");
  }

  const { weddingWishes, weddingData } = context;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Wedding
          </Link>
          
          <h1 className="text-4xl font-serif text-foreground mb-4">All Wedding Wishes</h1>
          <p className="text-muted-foreground">
            Beautiful messages from our friends and family for {weddingData.couple.groomName} & {weddingData.couple.brideName}
          </p>
        </div>

        {weddingWishes.length === 0 ? (
          <Card className="p-8 text-center">
            <CardContent>
              <Heart className="h-12 w-12 text-rose-300 mx-auto mb-4" />
              <h3 className="text-xl font-serif text-foreground mb-2">No wishes yet</h3>
              <p className="text-muted-foreground mb-6">Be the first to send your warm wishes to the couple!</p>
              <Link to="/#wishes">
                <Button>Add Your Wishes</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {weddingWishes.map((wish) => (
              <Card key={wish.id} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-rose-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-4 italic text-lg leading-relaxed">
                        "{wish.message}"
                      </p>
                      <p className="text-rose-600 font-medium">— {wish.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <div className="text-center pt-8">
              <Link to="/#wishes">
                <Button variant="outline">Add Your Wishes</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
