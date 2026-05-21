import { redirect } from 'next/navigation';

export { metadata } from '../faq/page';

export default function FaqsRoute() {
  redirect('/faq');
}
