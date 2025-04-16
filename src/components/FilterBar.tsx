
import React from 'react';
import { Filter, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from './ui/badge';

interface FilterBarProps {
  autoAccessOnly: boolean;
  setAutoAccessOnly: (value: boolean) => void;
  freeParkingOnly: boolean;
  setFreeParkingOnly: (value: boolean) => void;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
  availableRegions: string[];
  clearFilters: () => void;
  activeFilterCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  autoAccessOnly, 
  setAutoAccessOnly, 
  freeParkingOnly, 
  setFreeParkingOnly,
  selectedRegion,
  setSelectedRegion,
  availableRegions,
  clearFilters,
  activeFilterCount
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">Filtri</h2>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          <ToggleGroup type="multiple" className="justify-start">
            <ToggleGroupItem 
              value="auto-access" 
              aria-label="Toggle auto access filter" 
              data-state={autoAccessOnly ? "on" : "off"}
              onClick={() => setAutoAccessOnly(!autoAccessOnly)}
              className={autoAccessOnly ? "bg-success text-success-foreground hover:bg-success/90" : ""}
            >
              Accesso Automatico
            </ToggleGroupItem>
            <ToggleGroupItem 
              value="free-parking" 
              aria-label="Toggle free parking filter" 
              data-state={freeParkingOnly ? "on" : "off"}
              onClick={() => setFreeParkingOnly(!freeParkingOnly)}
              className={freeParkingOnly ? "bg-success text-success-foreground hover:bg-success/90" : ""}
            >
              Parcheggio Gratuito
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="flex items-center gap-2">
          <Select
            value={selectedRegion}
            onValueChange={setSelectedRegion}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tutte le regioni" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le regioni</SelectItem>
              {availableRegions.map(region => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {activeFilterCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="h-9"
            >
              <X className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
