import { NextPageContext } from 'next'
import { getSession, signOut } from 'next-auth/react'

import Navbar from '@components/components/Navbar';
import Billboard from '@components/components/Billboard';
import MovieList from '@components/components/MovieList';
import useMovieList from '@components/hooks/useMovieList';
import useFavorites from '@components/hooks/useFavorites';
import InfoModal from '@components/components/InfoModal';
import useInfoModal from '@components/hooks/useInfoModal';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <>
    <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title='Trending Now' data={movies} />
        <MovieList title='My List' data={favorites} />
      </div>
    </>
  )
}
