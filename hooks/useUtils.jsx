
export default function useUtils() {

  const formatDate = (date) => {
    const myDate = new Date(date)

    return myDate.toLocaleDateString('fr')
  }

  return {
    formatDate
  }

}
