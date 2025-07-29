import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { WeddingContext } from "@/context/WeddingContext";
import EditableText from "@/components/EditableText";
import Navigation from "@/components/Navigation";
import BackgroundAnimations from "@/components/BackgroundAnimations";
import DecorativeBackground from "@/components/DecorativeBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Phone, Mail, ExternalLink, Heart, Plus, Trash2 } from "lucide-react";
import type { WeddingWish, ScheduleItem } from "@/types/wedding";

export default function Index() {
  const context = useContext(WeddingContext);
  const [wishName, setWishName] = useState("");
  const [wishMessage, setWishMessage] = useState("");

  if (!context) {
    throw new Error("Index must be used within WeddingProvider");
  }

  const { weddingData, weddingWishes, updateWeddingData, addWish, isLoggedIn } = context;

  const handleAddWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMessage.trim()) return;

    const newWish: WeddingWish = {
      id: Date.now().toString(),
      name: wishName,
      message: wishMessage,
    };

    await addWish(newWish);
    setWishName("");
    setWishMessage("");
  };

  const handleAddScheduleItem = () => {
    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      time: "12:00 PM",
      event: "New Event",
      description: "Event description",
    };
    updateWeddingData({
      schedule: [...weddingData.schedule, newItem],
    });
  };

  const handleRemoveScheduleItem = (id: string) => {
    updateWeddingData({
      schedule: weddingData.schedule.filter(item => item.id !== id),
    });
  };

  const updateScheduleItem = (id: string, field: keyof ScheduleItem, value: string) => {
    updateWeddingData({
      schedule: weddingData.schedule.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Dynamic background animations */}
      <BackgroundAnimations />
      <DecorativeBackground />

      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${weddingData.couple.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
          <EditableText
            value={weddingData.couple.weddingQuote}
            onSave={(value) => updateWeddingData({ couple: { ...weddingData.couple, weddingQuote: value } })}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto"
          >
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light">
              {weddingData.couple.weddingQuote}
            </p>
          </EditableText>
          
          <div className="space-y-4">
            <EditableText
              value={weddingData.couple.groomName}
              onSave={(value) => updateWeddingData({ couple: { ...weddingData.couple, groomName: value } })}
              className="font-script text-6xl md:text-8xl text-rose-300"
            >
              <h1 className="font-script text-6xl md:text-8xl text-rose-300 mb-2">
                {weddingData.couple.groomName}
              </h1>
            </EditableText>
            
            <div className="text-4xl md:text-6xl font-light">&</div>
            
            <EditableText
              value={weddingData.couple.brideName}
              onSave={(value) => updateWeddingData({ couple: { ...weddingData.couple, brideName: value } })}
              className="font-script text-6xl md:text-8xl text-rose-300"
            >
              <h1 className="font-script text-6xl md:text-8xl text-rose-300">
                {weddingData.couple.brideName}
              </h1>
            </EditableText>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 bg-cream-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                value={weddingData.story.title}
                onSave={(value) => updateWeddingData({ story: { ...weddingData.story, title: value } })}
                className="text-4xl font-serif text-foreground mb-6"
              >
                <h2 className="text-4xl font-serif text-foreground mb-6">{weddingData.story.title}</h2>
              </EditableText>
              
              <EditableText
                value={weddingData.story.content}
                onSave={(value) => updateWeddingData({ story: { ...weddingData.story, content: value } })}
                multiline
                className="text-muted-foreground leading-relaxed"
              >
                <p className="text-muted-foreground leading-relaxed">{weddingData.story.content}</p>
              </EditableText>
            </div>
            
            <div className="relative">
              <img 
                src={weddingData.story.image} 
                alt="Our Story" 
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Details Section */}
      <section id="details" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-serif text-center text-foreground mb-16">Wedding Details</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Ceremony */}
            <Card className="p-6">
              <CardContent className="space-y-4">
                <EditableText
                  value={weddingData.weddingDetails.event1.title}
                  onSave={(value) => updateWeddingData({ 
                    weddingDetails: { 
                      ...weddingData.weddingDetails, 
                      event1: { ...weddingData.weddingDetails.event1, title: value }
                    }
                  })}
                  className="text-2xl font-serif text-rose-600 mb-4"
                >
                  <h3 className="text-2xl font-serif text-rose-600 mb-4">{weddingData.weddingDetails.event1.title}</h3>
                </EditableText>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <EditableText
                    value={weddingData.weddingDetails.event1.date}
                    onSave={(value) => updateWeddingData({ 
                      weddingDetails: { 
                        ...weddingData.weddingDetails, 
                        event1: { ...weddingData.weddingDetails.event1, date: value }
                      }
                    })}
                  >
                    <span>{weddingData.weddingDetails.event1.date}</span>
                  </EditableText>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <EditableText
                    value={weddingData.weddingDetails.event1.time}
                    onSave={(value) => updateWeddingData({ 
                      weddingDetails: { 
                        ...weddingData.weddingDetails, 
                        event1: { ...weddingData.weddingDetails.event1, time: value }
                      }
                    })}
                  >
                    <span>{weddingData.weddingDetails.event1.time}</span>
                  </EditableText>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <EditableText
                      value={weddingData.weddingDetails.event1.venue}
                      onSave={(value) => updateWeddingData({ 
                        weddingDetails: { 
                          ...weddingData.weddingDetails, 
                          event1: { ...weddingData.weddingDetails.event1, venue: value }
                        }
                      })}
                    >
                      <div className="font-medium">{weddingData.weddingDetails.event1.venue}</div>
                    </EditableText>
                    <EditableText
                      value={weddingData.weddingDetails.event1.address}
                      onSave={(value) => updateWeddingData({ 
                        weddingDetails: { 
                          ...weddingData.weddingDetails, 
                          event1: { ...weddingData.weddingDetails.event1, address: value }
                        }
                      })}
                    >
                      <div className="text-sm">{weddingData.weddingDetails.event1.address}</div>
                    </EditableText>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reception */}
            <Card className="p-6">
              <CardContent className="space-y-4">
                <EditableText
                  value={weddingData.weddingDetails.event2.title}
                  onSave={(value) => updateWeddingData({ 
                    weddingDetails: { 
                      ...weddingData.weddingDetails, 
                      event2: { ...weddingData.weddingDetails.event2, title: value }
                    }
                  })}
                  className="text-2xl font-serif text-rose-600 mb-4"
                >
                  <h3 className="text-2xl font-serif text-rose-600 mb-4">{weddingData.weddingDetails.event2.title}</h3>
                </EditableText>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <EditableText
                    value={weddingData.weddingDetails.event2.date}
                    onSave={(value) => updateWeddingData({ 
                      weddingDetails: { 
                        ...weddingData.weddingDetails, 
                        event2: { ...weddingData.weddingDetails.event2, date: value }
                      }
                    })}
                  >
                    <span>{weddingData.weddingDetails.event2.date}</span>
                  </EditableText>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <EditableText
                    value={weddingData.weddingDetails.event2.time}
                    onSave={(value) => updateWeddingData({ 
                      weddingDetails: { 
                        ...weddingData.weddingDetails, 
                        event2: { ...weddingData.weddingDetails.event2, time: value }
                      }
                    })}
                  >
                    <span>{weddingData.weddingDetails.event2.time}</span>
                  </EditableText>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <div>
                    <EditableText
                      value={weddingData.weddingDetails.event2.venue}
                      onSave={(value) => updateWeddingData({ 
                        weddingDetails: { 
                          ...weddingData.weddingDetails, 
                          event2: { ...weddingData.weddingDetails.event2, venue: value }
                        }
                      })}
                    >
                      <div className="font-medium">{weddingData.weddingDetails.event2.venue}</div>
                    </EditableText>
                    <EditableText
                      value={weddingData.weddingDetails.event2.address}
                      onSave={(value) => updateWeddingData({ 
                        weddingDetails: { 
                          ...weddingData.weddingDetails, 
                          event2: { ...weddingData.weddingDetails.event2, address: value }
                        }
                      })}
                    >
                      <div className="text-sm">{weddingData.weddingDetails.event2.address}</div>
                    </EditableText>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Things to Know */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <CardContent>
                <EditableText
                  value={weddingData.weddingDetails.toKnow1.title}
                  onSave={(value) => updateWeddingData({ 
                    weddingDetails: { 
                      ...weddingData.weddingDetails, 
                      toKnow1: { ...weddingData.weddingDetails.toKnow1, title: value }
                    }
                  })}
                  className="font-serif text-lg text-rose-600 mb-3"
                >
                  <h4 className="font-serif text-lg text-rose-600 mb-3">{weddingData.weddingDetails.toKnow1.title}</h4>
                </EditableText>
                <EditableText
                  value={weddingData.weddingDetails.toKnow1.description}
                  onSave={(value) => updateWeddingData({ 
                    weddingDetails: { 
                      ...weddingData.weddingDetails, 
                      toKnow1: { ...weddingData.weddingDetails.toKnow1, description: value }
                    }
                  })}
                  multiline
                  className="text-muted-foreground text-sm"
                >
                  <p className="text-muted-foreground text-sm">{weddingData.weddingDetails.toKnow1.description}</p>
                </EditableText>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <EditableText
                  value={weddingData.weddingDetails.toKnow2.title}
                  onSave={(value) => updateWeddingData({ 
                    weddingDetails: { 
                      ...weddingData.weddingDetails, 
                      toKnow2: { ...weddingData.weddingDetails.toKnow2, title: value }
                    }
                  })}
                  className="font-serif text-lg text-rose-600 mb-3"
                >
                  <h4 className="font-serif text-lg text-rose-600 mb-3">{weddingData.weddingDetails.toKnow2.title}</h4>
                </EditableText>
                <EditableText
                  value={weddingData.weddingDetails.toKnow2.description}
                  onSave={(value) => updateWeddingData({ 
                    weddingDetails: { 
                      ...weddingData.weddingDetails, 
                      toKnow2: { ...weddingData.weddingDetails.toKnow2, description: value }
                    }
                  })}
                  multiline
                  className="text-muted-foreground text-sm"
                >
                  <p className="text-muted-foreground text-sm">{weddingData.weddingDetails.toKnow2.description}</p>
                </EditableText>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent>
                <EditableText
                  value={weddingData.weddingDetails.toKnow3.title}
                  onSave={(value) => updateWeddingData({ 
                    weddingDetails: { 
                      ...weddingData.weddingDetails, 
                      toKnow3: { ...weddingData.weddingDetails.toKnow3, title: value }
                    }
                  })}
                  className="font-serif text-lg text-rose-600 mb-3"
                >
                  <h4 className="font-serif text-lg text-rose-600 mb-3">{weddingData.weddingDetails.toKnow3.title}</h4>
                </EditableText>
                <EditableText
                  value={weddingData.weddingDetails.toKnow3.description}
                  onSave={(value) => updateWeddingData({ 
                    weddingDetails: { 
                      ...weddingData.weddingDetails, 
                      toKnow3: { ...weddingData.weddingDetails.toKnow3, description: value }
                    }
                  })}
                  multiline
                  className="text-muted-foreground text-sm"
                >
                  <p className="text-muted-foreground text-sm">{weddingData.weddingDetails.toKnow3.description}</p>
                </EditableText>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-serif text-foreground">Wedding Schedule</h2>
            {isLoggedIn && (
              <Button onClick={handleAddScheduleItem} size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Event
              </Button>
            )}
          </div>
          
          <div className="space-y-6">
            {weddingData.schedule.map((item) => (
              <Card key={item.id} className="p-6">
                <CardContent className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <EditableText
                      value={item.time}
                      onSave={(value) => updateScheduleItem(item.id, 'time', value)}
                      className="text-lg font-semibold text-rose-600 min-w-[100px]"
                    >
                      <div className="text-lg font-semibold text-rose-600 min-w-[100px]">{item.time}</div>
                    </EditableText>
                    
                    <div>
                      <EditableText
                        value={item.event}
                        onSave={(value) => updateScheduleItem(item.id, 'event', value)}
                        className="text-lg font-serif text-foreground"
                      >
                        <h4 className="text-lg font-serif text-foreground">{item.event}</h4>
                      </EditableText>
                      <EditableText
                        value={item.description}
                        onSave={(value) => updateScheduleItem(item.id, 'description', value)}
                        className="text-muted-foreground"
                      >
                        <p className="text-muted-foreground">{item.description}</p>
                      </EditableText>
                    </div>
                  </div>
                  
                  {isLoggedIn && (
                    <Button
                      onClick={() => handleRemoveScheduleItem(item.id)}
                      size="sm"
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-serif text-foreground">Gallery</h2>
            <Link to="/gallery">
              <Button variant="outline">View All Photos</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weddingData.gallery.slice(0, 6).map((photo) => (
              <div key={photo.id} className="relative group overflow-hidden rounded-lg shadow-lg">
                <img 
                  src={photo.url} 
                  alt={photo.caption || "Gallery photo"} 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {photo.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                    <p className="text-sm">{photo.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Wishes Section */}
      <section id="wishes" className="py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-serif text-center text-foreground mb-16">Guest Wishes</h2>
          
          {/* Add Wish Form */}
          <Card className="p-6 mb-12">
            <CardContent>
              <form onSubmit={handleAddWish} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  required
                />
                <Textarea
                  placeholder="Your message for the couple..."
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                  rows={3}
                  required
                />
                <Button type="submit" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Send Your Wishes
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Wishes */}
          <div className="space-y-6 mb-8">
            {weddingWishes.slice(0, 3).map((wish) => (
              <Card key={wish.id} className="p-6">
                <CardContent>
                  <p className="text-muted-foreground mb-4 italic">"{wish.message}"</p>
                  <p className="text-rose-600 font-medium">— {wish.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/wishes">
              <Button variant="outline">View All Wishes</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section id="info" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <EditableText
            value={weddingData.moreInfo.title}
            onSave={(value) => updateWeddingData({ moreInfo: { ...weddingData.moreInfo, title: value } })}
            className="text-4xl font-serif text-center text-foreground mb-16"
          >
            <h2 className="text-4xl font-serif text-center text-foreground mb-16">{weddingData.moreInfo.title}</h2>
          </EditableText>
          
          <Card className="p-8">
            <CardContent>
              <EditableText
                value={weddingData.moreInfo.content}
                onSave={(value) => updateWeddingData({ moreInfo: { ...weddingData.moreInfo, content: value } })}
                multiline
                className="text-muted-foreground leading-relaxed text-center"
              >
                <p className="text-muted-foreground leading-relaxed text-center">{weddingData.moreInfo.content}</p>
              </EditableText>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-cream-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-serif text-center text-foreground mb-16">Contact Us</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <CardContent>
                <Phone className="h-8 w-8 text-rose-600 mx-auto mb-4" />
                <h4 className="font-serif text-lg text-foreground mb-2">Phone</h4>
                <EditableText
                  value={weddingData.contact.phone}
                  onSave={(value) => updateWeddingData({ contact: { ...weddingData.contact, phone: value } })}
                  className="text-muted-foreground"
                >
                  <p className="text-muted-foreground">{weddingData.contact.phone}</p>
                </EditableText>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent>
                <Mail className="h-8 w-8 text-rose-600 mx-auto mb-4" />
                <h4 className="font-serif text-lg text-foreground mb-2">Email</h4>
                <EditableText
                  value={weddingData.contact.email}
                  onSave={(value) => updateWeddingData({ contact: { ...weddingData.contact, email: value } })}
                  className="text-muted-foreground"
                >
                  <p className="text-muted-foreground">{weddingData.contact.email}</p>
                </EditableText>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent>
                <MapPin className="h-8 w-8 text-rose-600 mx-auto mb-4" />
                <h4 className="font-serif text-lg text-foreground mb-2">Address</h4>
                <EditableText
                  value={weddingData.contact.address}
                  onSave={(value) => updateWeddingData({ contact: { ...weddingData.contact, address: value } })}
                  multiline
                  className="text-muted-foreground"
                >
                  <p className="text-muted-foreground">{weddingData.contact.address}</p>
                </EditableText>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Jeweller Section */}
      <section id="jeweller" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="p-8 bg-gradient-to-r from-rose-50 to-blush-50 border-rose-200">
            <CardContent className="text-center">
              <h2 className="text-4xl font-serif text-foreground mb-4">{weddingData.jeweller.title}</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{weddingData.jeweller.description}</p>
              
              <div className="mb-6">
                <h3 className="text-2xl font-serif text-rose-600 mb-2">{weddingData.jeweller.shopName}</h3>
                <a 
                  href={weddingData.jeweller.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors"
                >
                  Visit Our Store
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              
              <Button size="lg" asChild>
                <a href={weddingData.jeweller.website} target="_blank" rel="noopener noreferrer">
                  Shop Now
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
