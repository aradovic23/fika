import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/solid';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  handleSearchChange: (term: string) => void;
  clearSearch: (term: string) => void;
}

export default function Search({ handleSearchChange, clearSearch }: Props) {
  const { t } = useTranslation('common');
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    handleSearchChange(newSearchTerm);
  };

  const onClearInput = (term: string) => {
    setSearchTerm(term);
    clearSearch(term);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <MagnifyingGlassIcon className="h-5 w-5 text-martinique-600" />
      </InputLeftElement>
      <Input
        id="search"
        placeholder={t('search') ?? 'Type to search...'}
        onChange={onSearchChange}
        value={searchTerm}
      />
      <InputRightElement cursor="pointer">
        <XCircleIcon className="h-4 w-4 text-martinique-300" onClick={() => onClearInput('')} />
      </InputRightElement>
    </InputGroup>
  );
}
