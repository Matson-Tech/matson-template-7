import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WeddingContext } from "@/context/WeddingContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const context = useContext(WeddingContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("Login must be used within WeddingProvider");
  }

  const { login, isLoggedIn } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await login(email, password);
      
      if (error) {
        setError(error.message || "Login failed");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blush-50 to-rose-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Heart className="h-8 w-8 text-rose-600" />
          </div>
          <CardTitle className="text-2xl font-serif text-foreground">Wedding Admin</CardTitle>
          <p className="text-muted-foreground">Sign in to edit your wedding website</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-destructive text-sm text-center">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Website
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
