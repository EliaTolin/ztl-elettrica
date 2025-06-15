import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Map, Plus, Menu, MessageCircle, Heart } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import TelegramIcon from './icons/TelegramIcon';
import ElectricCarIcon from './icons/ElectricCarIcon';

const Header = () => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <ElectricCarIcon className="text-primary" />
          <Link to="/" className="text-lg font-bold tracking-tight transition-colors duration-200 hover:text-primary">ZTL Elettrica</Link>
        </div>
        
        {isMobile ? (
          <div className="flex items-center gap-2">
            <a
              href="https://t.me/ztlelettrica"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                size="sm"
                aria-label="Telegram" 
                className="bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 ease-in-out transform active:scale-95 flex items-center gap-2 px-3"
              >
                <TelegramIcon className="h-5 w-5" color="#0088cc" />
              </Button>
            </a>
            <a
              href="https://coff.ee/eliatolin"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                size="sm"
                aria-label="Sostienici" 
                className="bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 ease-in-out transform active:scale-95 flex items-center gap-2 px-3"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </a>
            <Drawer>
              <DrawerTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  aria-label="Menu" 
                  className="bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300 ease-in-out transform active:scale-95"
                >
                  <Menu className="h-6 w-6 text-primary" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <nav className="px-4 pb-8">
                  <div className="space-y-4">
                    <Link to="/" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors">
                      <Map className="h-4 w-4" />
                      <span className="text-sm font-medium">Mappa</span>
                    </Link>
                    <Link to="/richiedi-zona" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors">
                      <Plus className="h-4 w-4" />
                      <span className="text-sm font-medium">Suggerisci Zona</span>
                    </Link>
                    <Link to="/contatti" className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Contatti</span>
                    </Link>
                    <a
                      href="https://t.me/ztlelettrica"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <TelegramIcon className="h-4 w-4" color="#0088cc" />
                      <span className="text-sm font-medium">Gruppo Telegram</span>
                    </a>
                    <a
                      href="https://coff.ee/eliatolin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      <span className="text-sm font-medium">Sostienici</span>
                    </a>
                  </div>
                </nav>
              </DrawerContent>
            </Drawer>
          </div>
        ) : (
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Mappa
            </Link>
            <Link to="/richiedi-zona" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-transform duration-200 hover:scale-105">
              <Button variant="outline" size="sm" className="gap-1 transition-all duration-200">
                <Plus className="h-4 w-4" />
                <span>Suggerisci Zona</span>
              </Button>
            </Link>
            <Link to="/contatti" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-transform duration-200 hover:scale-105">
              <Button variant="outline" size="sm" className="gap-1 transition-all duration-200">
                <MessageCircle className="h-4 w-4" />
                <span>Contatti</span>
              </Button>
            </Link>
            <a
              href="https://t.me/ztlelettrica"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-transform duration-200 hover:scale-105"
            >
              <Button variant="outline" size="sm" className="gap-1 transition-all duration-200">
                <TelegramIcon className="h-4 w-4" color="#0088cc" />
                <span>Gruppo Telegram</span>
              </Button>
            </a>
            <a
              href="https://coff.ee/eliatolin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-transform duration-200 hover:scale-105"
            >
              <Button variant="outline" size="sm" className="gap-1 transition-all duration-200">
                <Heart className="h-4 w-4" />
                <span>Sostienici</span>
              </Button>
            </a>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
