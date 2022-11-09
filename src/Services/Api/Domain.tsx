/**
 * Choose the correct backend url by looking at the user's hostname
 *
 * @return {string} backend url
 */
export default function Domain() {
    if (window.location.hostname === 'apps.filtpod.com') {
        return '54.219.95.248:5020/';
    } else {
        return 'http://localhost:5020/';
    }
}
