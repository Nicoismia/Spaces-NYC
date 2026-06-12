/**
 * Shared Tally booking form — used by all "Request a Shoot" and "Check Availability" CTAs.
 *
 * Replace TALLY_FORM_ID with your form ID from tally.so (the short ID in the form URL).
 * Example: https://tally.so/r/MeV82g → form ID is `MeV82g`
 *
 * Configure form fields, title, and confirmation message in the Tally dashboard.
 */
export const TALLY_FORM_ID = 'MeV82g'

export const TALLY_EMBED_URL = `https://tally.so/embed/${TALLY_FORM_ID}?transparentBackground=1`
