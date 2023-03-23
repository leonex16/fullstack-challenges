import './global.css';
import { InteractiveRatingDialog } from './components/interactive-rating-dialog'
import { ThankYouDialog } from './components/thank-you-dialog';
import { Dialog } from './components/dialog';

[
  Dialog,
  InteractiveRatingDialog,
  ThankYouDialog,
].forEach(WC => WC.mountOnWindow());