import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/store';

interface Props {
  page: number
  setPage: (updater: (prevPage: number) => number) => void;
}

const Pagination: React.FC<Props> = ({ page, setPage }) => {
  const { nextPage, loading } = useStore();

  const handlePrevPage = () => {
    if(page > 1 && !loading) {
      setPage(prevPage => prevPage - 1);
    }
  }

  const handleNextPage = () => {
    if(nextPage && !loading) {
      setPage(prevPage => prevPage + 1);
    }
  }

  return (
    <div className='flex justify-center items-center gap-3 mt-2 mb-4'>
      <button data-testid="prev" onClick={handlePrevPage}  className='bg-slate-400 rounded-md cursor-pointer p-2'>
        <ArrowLeft size={18} />
      </button>
      <span className='font-bold select-none'>{page}</span>
      <button data-testid="next" onClick={handleNextPage} className='bg-slate-400 rounded-md cursor-pointer p-2'>
        <ArrowRight size={18} />
      </button>
    </div>
  )
}

export default Pagination;