
;;; atom
;;; cons
;;; car cdr cxxxyyyr
;;; cond
;;; eq
;;; quote

;;; and or not
;;; t nil


(defun my-null (x)
  (eq x nil))

;;;if we replace every nil with 0
;;;then the symbol to end a list will be replaced too.
(defun my-subst (x y z)
  (cond ((atom z)
         (cond ((eq z y) x)
               (t z)))
        (t (cons (my-subst x y (car z))
                 (my-subst x y (cdr z))))))

;;; x is atom
;;; y is an formula
;;; z is a list
(defun my-subst-2 (x y z)
  (cond ((null z) z)
        ((atom (car z))
         (cond ((eq y (car z)) (cons x (my-subst-2 x y (cdr z))))
               (t (cons (car z) (my-subst-2 x y (cdr z))))))
        (t (cons (my-subst-2 x y (car z)) (my-subst-2 x y (cdr z))))))

;;; x and y are lists
(defun my-append (x y)
  (cond ( (null x) y)
        (t (cons  (car x) (my-append (cdr x) y)))))

;;; x and y are lists
;;; like zip
;;; (1 2 3) => (a b c) => ((1 a) (2 b) (3 c))
(defun my-pair (x y)
  (cond ((and (my-null x) (my-null y)) nil)
        ((and (not (atom x)) (not (atom y)))
         (cons (list (car x) (car y))
               (my-pair (cdr x) (cdr y))))))

(defun my-assoc (x y)
  (cond ((my-null y) y)
        (t (cond ((eq x (caar y)) (cadar y))
                 (t (my-assoc x (cdr y)))))))
