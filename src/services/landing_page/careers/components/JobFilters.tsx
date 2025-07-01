"use client";
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface JobFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setDepartment: (department: string) => void;
  setType: (type: string) => void;
  setSortBy: (sortBy: string) => void;
  departments: string[];
  types: string[];
}

const JobFilters: React.FC<JobFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  setDepartment,
  setType,
  setSortBy,
  departments,
  types,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-neobrutalism border-2 border-black mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="🔍 Cari lowongan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-black rounded-lg focus:ring-primary focus:border-primary"
        />
        <Select onValueChange={setDepartment}>
          <SelectTrigger className="border-2 bg-primary border-black rounded-lg">
            <SelectValue placeholder="Semua Departemen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Departemen</SelectItem>
            {departments.map(dep => <SelectItem key={dep} value={dep}>{dep}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select onValueChange={setType}>
          <SelectTrigger className="border-2 border-black rounded-lg">
            <SelectValue placeholder="Semua Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tipe</SelectItem>
            {types.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select onValueChange={setSortBy}>
          <SelectTrigger className="border-2 border-black rounded-lg">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title-asc">Judul (A-Z)</SelectItem>
            <SelectItem value="title-desc">Judul (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default JobFilters; 