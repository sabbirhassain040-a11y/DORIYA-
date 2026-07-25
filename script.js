<!-- অর্ডার করার পপ-আপ ফর্ম -->
<div class="modal" id="checkoutModal" style="display:none;">
    <div class="modal-content" style="max-width: 400px; padding: 20px;">
        <button class="close-modal" onclick="closeCheckoutModal()">✕</button>
        <h2>📦 অর্ডার সম্পন্ন করুন</h2>
        <form id="orderForm" onsubmit="sendOrderToWhatsApp(event)">
            <p><strong>মোট মূল্য: ৳ <span id="checkoutTotal">0</span></strong></p>
            <hr>
            <div style="margin-bottom: 10px;">
                <label>আপনার নাম:</label><br>
                <input type="text" id="custName" required placeholder="পুরো নাম লিখুন" style="width: 100%; padding: 8px; margin-top: 5px;">
            </div>
            <div style="margin-bottom: 10px;">
                <label>মোবাইল নম্বর:</label><br>
                <input type="tel" id="custPhone" required placeholder="017XXXXXXXX" style="width: 100%; padding: 8px; margin-top: 5px;">
            </div>
            <div style="margin-bottom: 10px;">
                <label>পূর্ণাঙ্গ ঠিকানা:</label><br>
                <textarea id="custAddress" required placeholder="বাসা/রোড, এলাকা, জেলা" style="width: 100%; padding: 8px; margin-top: 5px;"></textarea>
            </div>
            <button type="submit" style="background: #25D366; color: white; border: none; width: 100%; padding: 12px; font-weight: bold; border-radius: 5px; cursor: pointer;">
                📲 WhatsApp-এ অর্ডার পাঠান
            </button>
        </form>
    </div>
</div>
