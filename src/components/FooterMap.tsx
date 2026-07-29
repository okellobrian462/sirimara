export default function FooterMap() {
    return (
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3988.8387800474793!2d36.76747697496565!3d-1.2696414987182711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMcKwMTYnMTAuNyJTIDM2wrA0NicxMi4yIkU!5e0!3m2!1sen!2ske!4v1751519667079!5m2!1sen!2ske"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sirimara Location Map"
        />
    );
}