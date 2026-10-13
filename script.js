/* ==========================================================================
   MINIMALIST EDITORIAL PORTFOLIO — JAVASCRIPT
   Interactions, Modals, Off-Canvas Navigation, Clipboard & Smooth Scroll
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Current Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Off-Canvas Menu Elements
  const openMenuBtn = document.getElementById('openMenuBtn');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuNavItems = document.querySelectorAll('.menu-nav-item');

  function openMenu() {
    menuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openMenuBtn) openMenuBtn.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

  // Close menu on backdrop click
  if (menuOverlay) {
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) closeMenu();
    });
  }

  // Close menu on nav item click
  menuNavItems.forEach((item) => {
    item.addEventListener('click', () => {
      closeMenu();
    });
  });

  // 3. Contact Modal Elements
  const openContactBtn = document.getElementById('openContactBtn');
  const closeContactBtn = document.getElementById('closeContactBtn');
  const contactModal = document.getElementById('contactModal');

  function openContact() {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeContact() {
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openContactBtn) openContactBtn.addEventListener('click', openContact);
  if (closeContactBtn) closeContactBtn.addEventListener('click', closeContact);

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeContact();
    });
  }

  // 4. Work Detail Dynamic Modal
  const workModal = document.getElementById('workDetailModal');
  const closeWorkModalBtn = document.getElementById('closeWorkModalBtn');
  const modalWorkTitle = document.getElementById('modalWorkTitle');
  const modalWorkDesc = document.getElementById('modalWorkDesc');
  const modalWorkLink = document.getElementById('modalWorkLink');

  window.openWorkDetail = function(title, desc, link) {
    if (modalWorkTitle) modalWorkTitle.textContent = title;
    if (modalWorkDesc) modalWorkDesc.textContent = desc;
    if (modalWorkLink) modalWorkLink.href = link || '#';
    if (workModal) {
      workModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function closeWorkModal() {
    if (workModal) {
      workModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (closeWorkModalBtn) closeWorkModalBtn.addEventListener('click', closeWorkModal);
  if (workModal) {
    workModal.addEventListener('click', (e) => {
      if (e.target === workModal) closeWorkModal();
    });
  }

  // 5. News "SEE DETAILS" Click Handlers
  const newsDetailData = {
    'news-modal-1': {
      title: '심층 강화학습 & LLM 자율 에이전트 마스터클래스',
      desc: 'PPO/DPO 알고리즘 기반의 정책 최적화부터 함수 호출(Function Calling) 및 다중 도구 제어 능력을 갖춘 자율형 에이전트 설계까지 실무형 연구와 실습을 집중 조망하는 특강 시리즈입니다.',
      link: 'https://github.com'
    },
    'news-modal-2': {
      title: '생성형 AI 시대의 모델 신뢰성 평가 & AI 거버넌스',
      desc: 'LLM의 환각 현상(Hallucination), 안전성 편향, 데이터 프라이버시 이슈를 진단하고 엔터프라이즈 환경에서 신뢰할 수 있는 AI 거버넌스 프레임워크를 수립하는 연구 보고서입니다.',
      link: 'https://github.com'
    }
  };

  const newsActionBtns = document.querySelectorAll('.news-action-btn');
  newsActionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      const data = newsDetailData[modalId];
      if (data) {
        window.openWorkDetail(data.title, data.desc, data.link);
      }
    });
  });

  // 6. Toast Notification & Copy Email
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  function copyTextToClipboard(text, successMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage || '클립보드에 복사되었습니다.');
      }).catch(() => {
        fallbackCopy(text, successMessage);
      });
    } else {
      fallbackCopy(text, successMessage);
    }
  }

  function fallbackCopy(text, successMessage) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
      document.execCommand('copy');
      showToast(successMessage || '클립보드에 복사되었습니다.');
    } catch (err) {
      showToast('복사에 실패했습니다. 수동으로 복사해주세요.');
    }
    document.body.removeChild(tempInput);
  }

  // Copy Email Button in Modal
  const copyEmailAction = document.getElementById('copyEmailAction');
  const emailVal = document.getElementById('emailVal');
  if (copyEmailAction && emailVal) {
    copyEmailAction.addEventListener('click', () => {
      copyTextToClipboard(emailVal.textContent.trim(), '이메일 주소가 복사되었습니다.');
    });
  }

  // Copy Email in Footer
  const footerEmailBtn = document.querySelector('.copy-email-btn');
  if (footerEmailBtn) {
    footerEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = footerEmailBtn.getAttribute('data-email') || 'hello@example.com';
      copyTextToClipboard(email, `${email} 주소가 복사되었습니다.`);
    });
  }

  // 7. Scroll To Top Button
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 8. Global Keyboard Listener (ESC to close any open modal/menu)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
      closeContact();
      closeWorkModal();
    }
  });
});
