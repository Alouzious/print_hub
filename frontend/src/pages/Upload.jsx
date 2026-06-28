import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ArrowLeft, CheckCircle2, Receipt, FileCheck, FileText, X,
  AlertCircle, Image as ImageIcon,
} from 'lucide-react';
import PaymentButton from '../components/PaymentButton';
import { getApiUrl } from '../utils/api';
import { calculatePrice, formatUgx, validateFile, formatFileSize } from '../utils/pricing';

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [pageCount, setPageCount] = useState(1);
  const [isColor, setIsColor] = useState(false);
  const [isDoubleSided, setIsDoubleSided] = useState(false);
  const [station, setStation] = useState('main-campus');
  const [orderId, setOrderId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const pricing = useMemo(
    () => calculatePrice(pageCount, isColor, isDoubleSided),
    [pageCount, isColor, isDoubleSided]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setFileError(null);
      setShowPayment(false);
      setOrderId(null);
      return;
    }

    const err = validateFile(file);
    setFileError(err);
    setSelectedFile(file);
    setShowPayment(false);
    setOrderId(null);

    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const clearFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setFileError(null);
    setShowPayment(false);
    setOrderId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || fileError) return;

    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?.id || 1;

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('file_name', selectedFile.name);
    formData.append('page_count', pageCount);
    formData.append('is_color', isColor);
    formData.append('is_double_sided', isDoubleSided);
    formData.append('station', 1);
    formData.append('client_id', userId);

    try {
      const response = await axios.post(getApiUrl('orders/create/'), formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOrderId(response.data.id);
      setShowPayment(true);
    } catch (error) {
      console.error(error);
      alert('Failed to create order. Check console.');
    }
  };

  const handlePaymentSuccess = async (transactionId) => {
    try {
      await axios.post(getApiUrl('orders/verify/'), {
        transaction_id: transactionId,
        order_id: orderId,
      });
      alert('Payment Successful! Your order is now being printed.');
    } catch (error) {
      console.error(error);
      alert('Payment verification failed. Please contact support.');
    }
  };

  const ext = selectedFile ? '.' + selectedFile.name.split('.').pop().toLowerCase() : '';

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl">
          <Link to="/" className="text-blue-400 hover:text-blue-300 mb-4 inline-flex items-center gap-1.5 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-blue-400" /> Upload Document
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select File</label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer bg-white/5 border border-white/10 rounded-xl"
                required
              />
            </div>

            {selectedFile && (
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium text-sm">{selectedFile.name}</p>
                    <p className="text-gray-400 text-xs">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <button type="button" onClick={clearFile} className="text-gray-400 hover:text-red-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {previewUrl && (
                  <img src={previewUrl} alt="Preview" className="mt-3 max-h-40 rounded-lg border border-white/10" />
                )}
                {!previewUrl && ext === '.pdf' && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-red-400" />
                    </div>
                    <p className="text-gray-400 text-xs">PDF — est. ~{Math.max(1, Math.round(selectedFile.size / 51200))} pages</p>
                  </div>
                )}
                {!previewUrl && ext !== '.pdf' && selectedFile && (
                  <div className="mt-3 flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-gray-400 text-xs">Document file</p>
                  </div>
                )}

                {fileError ? (
                  <p className="text-red-400 text-xs mt-2 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{fileError}</p>
                ) : (
                  <p className="text-green-400 text-xs mt-2 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> File ready</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Number of Pages</label>
              <input type="number" min="1" value={pageCount}
                onChange={(e) => setPageCount(parseInt(e.target.value) || 1)}
                className="block w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition">
                <input type="checkbox" checked={isColor} onChange={() => setIsColor(!isColor)} className="rounded text-blue-600 h-4 w-4" />
                <div>
                  <span className="text-sm text-white block">Color Print</span>
                  <span className="text-xs text-gray-400">+100 UGX/page</span>
                </div>
              </label>
              <label className="flex items-center space-x-3 bg-white/5 p-3 rounded-xl border border-white/10 cursor-pointer hover:bg-white/10 transition">
                <input type="checkbox" checked={isDoubleSided} onChange={() => setIsDoubleSided(!isDoubleSided)} className="rounded text-blue-600 h-4 w-4" />
                <div>
                  <span className="text-sm text-white block">Double Sided</span>
                  <span className="text-xs text-gray-400">Half page count</span>
                </div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Pickup Station</label>
              <select value={station} onChange={(e) => setStation(e.target.value)}
                className="block w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="main-campus" className="bg-slate-800">Main Campus</option>
                <option value="engineering" className="bg-slate-800">Engineering Faculty</option>
                <option value="in-town" className="bg-slate-800">In Town</option>
              </select>
            </div>
          </form>
        </div>

        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-blue-400" /> Live Price Breakdown
            </h3>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>Pages</span><span>{pricing.pages}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>Mode</span><span>{isColor ? 'Color' : 'Black & White'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>Double-sided</span>
                <span>{isDoubleSided ? `Yes (${pricing.effectivePages} effective)` : 'No'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/10">
                <span>Price per page</span><span className="font-mono text-blue-400">{formatUgx(pricing.pricePerPage)}</span>
              </div>
            </div>
            <div className="mt-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-1">Total Amount Due</p>
              <p className="text-4xl font-black text-white">{formatUgx(pricing.total)}</p>
            </div>
          </div>

          <div className="mt-8">
            {showPayment ? (
              <PaymentButton amount={pricing.total} onPaymentSuccess={handlePaymentSuccess} />
            ) : (
              <button type="submit" onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50"
                disabled={!selectedFile || !!fileError}>
                Proceed to Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
