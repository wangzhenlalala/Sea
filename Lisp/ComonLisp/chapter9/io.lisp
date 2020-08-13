(defun draw-line (lines)
  (cond ((equal lines 0) (format t "~&"))
        (t (format t "*")
            (draw-line (- lines 1)))))

(defun draw-box (width height)
  (cond ((zerop height) nil)
        (t (draw-line width)
           (draw-box width (- height 1))))) 

(defun my-square ()
  (format t "Please type in a number: ")
  (let ((x (read)))
    (format t "The number ~S squared is ~S~&"
            x (* x x))))


(defun cookie-monster ()
  (format t "give me cookie!!!~&")
  (format t "Cookie? ")
  (let ((x (read)))
    (cond ((equal x 'cookie) (format t "Thank you~&"))
          (t (format t "No want ~S~%~%" x)
             (cookie-monster)))))
       

(defun riddle ()
  (if (yes-or-no-p
         "Are you thirty?")
      (format t "Ok, just drink some water")
      (format t "Just go home")))

(defun get-tree-data ()
  (with-open-file (stream "/Users/wangzhen/Documents/Wangzhen/code/Sea/Lisp/ComonLisp/chapter9/timber.txt")
    (let* ((tree-loc (read stream))
           (tree-table (read stream))
           (tree-nums (read stream)))
      (format t "~&There are ~S trees on ~S."
              tree-nums tree-loc)
      (format t "~&They are:  ~S" tree-table))))

;;; (sevenths '(1 2/3 2 3.5))
(defun sevenths (x)
  (mapcar #'(lambda (numerator)
              (format t "~&~4,2F / 7 is ~7,5F"
                      numerator
                      (/ numerator 7.0)))
          x))
