const fmt = n => '¥' + Math.round(n).toLocaleString('ja-JP');

function update() {
  const bind = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || '—'; };

  bind('p-senderName',    document.getElementById('senderName').value);
  bind('p-senderAddress', document.getElementById('senderAddress').value);
  bind('p-senderPhone',   document.getElementById('senderPhone').value);
  bind('p-clientName',    document.getElementById('clientName').value);
  bind('p-receiptNo',     document.getElementById('receiptNo').value);
  bind('p-description',   document.getElementById('description').value);

  const issueRaw = document.getElementById('issueDate').value;
  bind('p-issueDate', issueRaw ? issueRaw.replace(/-/g, '/') : '');

  const taxRate = parseFloat(document.getElementById('taxRate').value);
  const taxLabel = taxRate === 0.10 ? '消費税（10%）' : taxRate === 0.08 ? '消費税（8%）' : '消費税（非課税）';
  document.getElementById('p-taxLabel').textContent = taxLabel;

  const amount = parseFloat(document.getElementById('amount').value) || 0;
  const tax    = amount * taxRate;
  const total  = amount + tax;

  document.getElementById('p-subtotal').textContent   = fmt(amount);
  document.getElementById('p-tax').textContent        = fmt(tax);
  document.getElementById('p-total').textContent      = fmt(total);
  document.getElementById('p-grandTotal').textContent = fmt(total);
}

document.getElementById('printBtn').addEventListener('click', () => window.print());

document.getElementById('proSignupBtn').addEventListener('click', () => {
  const email = document.getElementById('proEmail').value;
  const msg = document.getElementById('signupMessage');
  if (!email || !email.includes('@')) {
    msg.textContent = '正しいメールアドレスを入力してください。';
    msg.style.color = '#fc8181';
    return;
  }
  msg.textContent = 'ありがとうございます！案内をお送りします。';
  msg.style.color = '#48bb78';
});

['senderName','senderAddress','senderPhone','clientName','issueDate','receiptNo','description','amount','taxRate']
  .forEach(id => document.getElementById(id).addEventListener('input', update));

document.getElementById('issueDate').value = new Date().toISOString().slice(0,10);
update();
