/* GLOBAL SETTINGS */
* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
html { scroll-behavior: smooth; }
body { background-color: #050505; color: #ffffff; overflow-x: hidden; }
.highlight { color: #dc2626; }

/* NAVIGATION */
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 20px 5%; background: rgba(0,0,0,0.9); border-bottom: 1px solid #1a1a1a; position: sticky; top: 0; z-index: 1000; backdrop-filter: blur(10px); }
.logo { font-size: 1.5rem; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; }
.nav-links { display: flex; gap: 30px; list-style: none; }
.nav-links a { color: #fff; text-decoration: none; font-weight: 500; font-size: 0.9rem; transition: 0.3s; }
.nav-links a:hover { color: #dc2626; }

/* BUTTONS */
.cta-btn { background: #dc2626; color: white; padding: 12px 28px; border: none; font-weight: 600; cursor: pointer; transition: 0.3s; border-radius: 2px; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px; text-decoration: none; display: inline-block; }
.cta-btn:hover { background: #b91c1c; box-shadow: 0 0 15px rgba(220, 38, 38, 0.4); }
.secondary-btn { background: transparent; color: white; padding: 12px 28px; border: 1px solid #444; font-weight: 600; cursor: pointer; transition: 0.3s; text-decoration: none; display: inline-block; text-transform: uppercase; font-size: 0.85rem; }
.secondary-btn:hover { border-color: white; }
.block-btn { width: 100%; margin-top: 15px; padding: 16px; font-size: 1rem; }

/* HERO SECTION */
.hero { display: flex; min-height: 90vh; align-items: center; padding: 0 5%; border-bottom: 1px solid #1a1a1a; position: relative; }
.hero-content { flex: 1; z-index: 10; padding-right: 5%; }
.badge { display: inline-block; padding: 6px 12px; background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.3); color: #dc2626; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 20px; font-weight: 600; }
.hero-content h1 { font-size: 4.5rem; line-height: 1.1; margin-bottom: 20px; font-weight: 800; letter-spacing: -1px; }
.hero-content p { color: #9ca3af; font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; max-width: 90%; }
.btn-group { display: flex; gap: 15px; }
.canvas-container { flex: 1; height: 600px; display: flex; justify-content: center; align-items: center; }
#canvas-wrapper { width: 100%; height: 100%; outline: none; }

/* STATS COUNTER SECTION */
.stats-section { display: flex; justify-content: space-around; padding: 60px 5%; background: #0a0a0a; border-bottom: 1px solid #1a1a1a; flex-wrap: wrap; gap: 20px; }
.stat-box { text-align: center; }
.stat-box h2 { font-size: 3.5rem; color: #dc2626; font-weight: 900; margin-bottom: 5px; }
.stat-box p { color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; font-size: 0.9rem; font-weight: 600; }

/* SERVICES GRID WITH ANIMATIONS */
.services { padding: 100px 5%; background: #050505; }
.section-header { text-align: center; margin-bottom: 60px; }
.section-header h2 { font-size: 3rem; margin-bottom: 15px; }
.grid-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
.service-card { background: #111; padding: 40px 30px; border: 1px solid #222; border-radius: 4px; transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease; border-top: 3px solid transparent; }
.service-card:hover { transform: translateY(-10px); border-top-color: #dc2626; border-left-color: #333; border-right-color: #333; border-bottom-color: #333; box-shadow: 0 15px 30px rgba(220, 38, 38, 0.05); }
.icon { font-size: 2.5rem; color: #dc2626; margin-bottom: 20px; }
.card-content h3 { font-size: 1.5rem; margin-bottom: 15px; }
.card-content p { color: #9ca3af; line-height: 1.6; }

/* ESTIMATOR & CONTACT SECTIONS */
.estimator-section, .contact-section { padding: 100px 5%; background: #0a0a0a; display: flex; justify-content: center; }
.contact-section { background: #050505; }
.estimator-container, .contact-container { background: #111; padding: 50px; border-radius: 4px; width: 100%; max-width: 650px; border: 1px solid #222; box-shadow: 0 20px 40px rgba(0,0,0,0.8); }
.estimator-container h2, .contact-container h2 { font-size: 2.5rem; text-align: center; margin-bottom: 10px; }
.form-group { margin-bottom: 25px; }
.form-group label { display: block; margin-bottom: 10px; color: #fff; font-weight: 600; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
.form-group input[type="text"], .form-group input[type="tel"], .form-group input[type="number"], .form-group select { width: 100%; padding: 18px; background: #000; border: 1px solid #333; color: white; border-radius: 2px; font-size: 1rem; outline: none; transition: border-color 0.3s; }
.form-group input:focus, .form-group select:focus { border-color: #dc2626; }
.checkbox-group label { display: block; margin-bottom: 10px; color: #9ca3af; font-size: 0.95rem; cursor: pointer; }
.checkbox-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.checkbox-grid label { color: #9ca3af; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 10px; }
.result-box { margin-top: 30px; padding: 30px; background: #000; border-left: 4px solid #dc2626; display: none; text-align: center; animation: slideIn 0.5s ease; }
.result-box h3 { font-size: 2.5rem; margin-top: 10px; }

/* FOOTER */
.footer { background: #000; padding: 30px 5%; text-align: center; border-top: 1px solid #1a1a1a; color: #9ca3af; font-size: 0.9rem; }

/* UTILITY ANIMATIONS */
.reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s ease-out; }
.reveal.active { opacity: 1; transform: translateY(0); }
.fade-in { animation: fadeIn 1.2s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }

/* RESPONSIVENESS */
@media (max-width: 768px) {
    .hero { flex-direction: column; text-align: center; padding-top: 80px; }
    .hero-content { padding-right: 0; }
    .hero-content h1 { font-size: 3rem; }
    .btn-group { justify-content: center; }
    .canvas-container { height: 400px; width: 100%; margin-top: 20px; }
    .nav-links { display: none; }
    .checkbox-grid { grid-template-columns: 1fr; }
}
