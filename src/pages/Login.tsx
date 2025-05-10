
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/hooks/redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Film } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    dispatch(loginStart());
    
    // Simulate API delay
    setTimeout(() => {
      // For demo purposes, we're using a simple auth check
      if (username && password.length >= 4) {
        dispatch(loginSuccess({ username, isAuthenticated: true }));
        toast({
          title: "Login successful",
          description: `Welcome back, ${username}!`,
        });
        navigate("/");
      } else {
        toast({
          title: "Login failed",
          description: "Username and password are required. Password must be at least 4 characters.",
          variant: "destructive",
        });
      }
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-movie-primary/20 via-background to-movie-secondary/20">
      <div className="w-full max-w-md px-4 py-12 animate-fade-in">
        <Card className="backdrop-blur-sm bg-background/70 border-muted">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <Film className="h-10 w-10 text-movie-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">ReelVerse Explorer</CardTitle>
            <CardDescription>Sign in to discover and explore movies</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={4}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-movie-primary hover:bg-movie-primary/90" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In
                  </span>
                ) : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            <div className="w-full">
              <p>For demo purposes, enter any username and password (min 4 chars)</p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
