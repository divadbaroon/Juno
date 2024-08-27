import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { FilterType, FilterOption, profileFilterOptions, llmFilterOptions, voiceFilterOptions, extensionFilterOptions } from '@/constants';

const Filter = ({ type }: { type: string }) => {
    const [activeFilters, setActiveFilters] = useState<{[key: string]: string}>({});
    const [activeFilterType, setActiveFilterType] = useState<FilterType[]>([]);

    useEffect(() => {
        if (type === 'Profiles') {
            setActiveFilterType(profileFilterOptions);
        } else if (type === 'LLMs') {
            setActiveFilterType(llmFilterOptions);
        } else if (type === 'Voices') {
            setActiveFilterType(voiceFilterOptions);
        } else if (type === 'Extensions') {
            setActiveFilterType(extensionFilterOptions);
        }
    }, [type]);

    const addFilter = (filterType: string) => {
        setActiveFilters(prev => ({ ...prev, [filterType]: '' }));
    };

    const removeFilter = (filterType: string) => {
        setActiveFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[filterType];
            return newFilters;
        });
    };

    const updateFilter = (filterType: string, value: string) => {
        setActiveFilters(prev => ({ ...prev, [filterType]: value }));
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus-visible:ring-offset-0 focus-visible:ring-0" asChild>
                    <Button variant="outline" size="sm" className="-mt-4 ml-1">Add filter</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {activeFilterType.map((option: FilterType) => (
                        <DropdownMenuItem 
                            key={option.value}
                            onClick={() => addFilter(option.value)}
                            disabled={activeFilters.hasOwnProperty(option.value)}
                        >
                            {option.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex-1 flex items-center space-x-1 -mt-3">
                {Object.entries(activeFilters).map(([filterType, filterValue]) => {
                    const filterOption = activeFilterType.find(option => option.value === filterType);
                    return (
                        <div key={filterType} className="flex items-center space-x-.5 -ml-2.5">
                            <Select
                                value={filterValue}
                                onValueChange={(value) => updateFilter(filterType, value)}
                            >
                                <SelectTrigger className="w-[150px] ring-0 focus:ring-0">
                                    <SelectValue placeholder={`Select ${filterOption?.label}`} />
                                </SelectTrigger>
                                <SelectContent>
                                    {filterOption?.options.map((option: FilterOption) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={() => removeFilter(filterType)} variant="ghost" size="icon">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Filter;