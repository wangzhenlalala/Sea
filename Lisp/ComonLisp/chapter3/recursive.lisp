(defun factorial (n)
  (cond ((zerop n) 1)
        (t (* n (factorial (- n 1))))))

;;; will this conjecture return for every positive integer
(defun collatz-conjecture (n)
  (cond ((equal n 1) t)
        ((evenp n) (collatz-conjecture (/ n 2)))
        (t (collatz-conjecture (+ 1 (* 3 n))))))


;;; find first atom of the list. the list may be nested
(defun find-first-atom (x)
  (cond ((atom x) x)
        (t (find-first-atom x))))

(defun give-func (x)
  (cond((eq x '+) #'+)
         ((eq x '-) #'-)
         ((eq x '*) #'*)
         (t #'/)))

;;; (funcall (first '(+)) 1 2 3)
;;; no need for give-func
;;; (funcall '+ 1 2 3) is also ok
;;; (funcall + 1 2 3) is Error
;;; (1 + (2 * 3)) = 7

(defun arith-eval (expression)
  (cond ((numberp expression) expression)
        (t (funcall (give-func (second expression))
                    (arith-eval (first expression))
                    (arith-eval (third expression))))))
