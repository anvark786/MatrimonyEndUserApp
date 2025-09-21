import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faCheck } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import './SubscriptionPlans.css';
import callCommonInternalApiService from '../../../services/callCommonInternalApiService';
import Header from '../../../components/common/Header';
import Sidebar from '../../../components/common/Sidebar';

const SubscriptionPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await callCommonInternalApiService('payments/plans/', 'get');
        setPlans(response);
      } catch (error) {
        toast.error("Failed to load plans");
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Razorpay payment handler
  const handleChoosePlan = async (planId) => {
    try {
      // 1. Create order
      const createRes = await callCommonInternalApiService('payments/create/', 'post', { plan_id: planId });
      const { order_id, amount, currency, razorpay_key } = createRes;

      // 2. Open Razorpay checkout
      const options = {
        key: razorpay_key,
        amount: amount * 100, // Razorpay expects paise
        currency,
        name: 'Shaddikarro',
        description: 'Subscription Payment',
        order_id,
        handler: async function (response) {
          // 3. Verify payment
          try {
            const verifyRes = await callCommonInternalApiService('payments/verify/', 'post', {
              order_id: order_id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            toast.success(verifyRes.message || "Payment successful!");
            navigate('/profile'); // Redirect to home page after success
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          // Optionally add user info here
        },
        theme: {
          color: "#FFD700"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment initiation failed");
    }
  };

  return (
    <div className="layout-container">
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8">
            <div className="subscription-plans-container">
              <h2 className="text-center mb-4">
                <FontAwesomeIcon icon={faCrown} style={{ color: '#FFD700', fontSize: '2rem', marginRight: '0.5rem' }} />
                Premium Subscription Plans
              </h2>
              {loading ? (
                <div className="text-center my-5">Loading plans...</div>
              ) : (
                <div className="plans-row">
                  {plans.map(plan => (
                    <div className="plan-card" key={plan.id}>
                      <div className="plan-header" style={{ background: plan.code === 'premium' ? '#FFD700' : '#eee' }}>
                        <FontAwesomeIcon icon={faCrown} className="plan-icon" />
                        <span className="plan-name">{plan.name}</span>
                      </div>
                      <div className="plan-price">
                        ₹{parseFloat(plan.price).toLocaleString()} 
                        {plan.duration_days > 0 && (
                          <span className="plan-duration"> / {plan.duration_days} Days</span>
                        )}
                      </div>
                      <ul className="plan-features-list">
                        {plan.features?.map((feature, index) => (
                          <li key={index} className="feature-item">
                            <FontAwesomeIcon icon={faCheck} className="feature-icon" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="btn btn-primary w-100 mt-2"
                        onClick={() => handleChoosePlan(plan.id)}
                      >
                        Choose {plan.name}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;