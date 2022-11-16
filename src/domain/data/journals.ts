import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { Journal } from '../types/Journal'

export const getJournalsByUserId = async (userId: string) => {
  const journals: Journal[] = []
  const q = query(collection(db, 'journals'), where('userId', '==', userId))
  const querySnapshot = await getDocs(q)
  const journalList = querySnapshot.docs.map(doc => doc.data())
  journalList.forEach(journalDoc => {
    const journal: Journal = {
      date: journalDoc.date.toDate(),
      moonPhase: journalDoc.moonPhase,
      text: journalDoc.text,
      userId: journalDoc.userId,
      id: journalDoc.id,
    }
    journals.push(journal)
  })

  return journals
}

export const createNewJournal = async (journal: Journal) => {
  await addDoc(collection(db, "journals"), journal);
}
